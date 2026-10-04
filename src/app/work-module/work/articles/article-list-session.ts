import { Observable, Subscription } from 'rxjs';
import { ArticlePage, ListingArticle } from '../../models/dev.model';

export type ListingState = 'initial-loading' | 'ready' | 'empty' | 'initial-error' |
  'appending' | 'append-error' | 'disposed';
export interface SessionArticle extends ListingArticle {
  sessionKey: string;
  encounterOrder: number;
}
export interface ArticleCheckpoint {
  displayed: SessionArticle[];
  datedBuffer: SessionArticle[];
  undatedBuffer: SessionArticle[];
  acceptedIds: number[];
  nextPage: number;
  sourceExhausted: boolean;
  sourceHadRecords: boolean;
  encounterOrder: number;
  hasMore: boolean;
}

export class ArticleListSession {
  state: ListingState = 'initial-loading';
  displayed: SessionArticle[] = [];
  hasMore = false;
  private committed: ArticleCheckpoint = {
    displayed: [], datedBuffer: [], undatedBuffer: [], acceptedIds: [],
    nextPage: 1, sourceExhausted: false, sourceHadRecords: false, encounterOrder: 0, hasMore: false,
  };
  private pending?: ArticleCheckpoint;
  private requests = new Subscription();
  private started = false;
  private active = false;
  private appending = false;
  get checkpoint(): ArticleCheckpoint {
    return structuredClone(this.committed);
  }
  constructor(private readonly load: (page: number) => Observable<ArticlePage>,
    private readonly changed: (firstNew?: string) => void = () => undefined) {}
  start(): void {
    if (this.started || this.state === 'disposed') return;
    this.started = true;
    this.run(false);
  }
  append(): void {
    if (this.active || this.state !== 'ready' || !this.hasMore) return;
    this.run(true);
  }
  retry(): void {
    if (this.active || (this.state !== 'initial-error' && this.state !== 'append-error')) return;
    this.run(this.state === 'append-error');
  }
  dispose(): void {
    this.state = 'disposed';
    this.active = false;
    this.requests.unsubscribe();
    this.pending = undefined;
  }

  private run(append: boolean): void {
    this.appending = append;
    this.active = true;
    this.state = append ? 'appending' : 'initial-loading';
    this.pending ??= this.checkpoint;
    this.changed();
    this.advance();
  }

  private advance(): void {
    if (!this.active || !this.pending || this.state === 'disposed') return;
    const pending = this.pending;
    const available = pending.datedBuffer.length +
      (pending.sourceExhausted ? pending.undatedBuffer.length : 0);
    // Undated records cannot be released ahead of later dated source pages.
    if (pending.sourceExhausted || (available > 10 && !pending.undatedBuffer.length)) {
      this.commit(pending);
      return;
    }
    this.requests.add(this.load(pending.nextPage).subscribe({
      next: page => {
        if (!this.active || this.state === 'disposed' || this.pending !== pending) return;
        pending.sourceHadRecords ||= page.rawCount > 0;
        for (const record of page.records) {
          const id = record.source.id;
          if (id !== undefined && pending.acceptedIds.includes(id)) {
            console.debug('Duplicate article ignored:', id);
            continue;
          }
          if (id !== undefined) pending.acceptedIds.push(id);
          const encounterOrder = pending.encounterOrder++;
          const accepted: SessionArticle = {
            ...record, encounterOrder,
            sessionKey: id === undefined ? `encounter-${encounterOrder}` : `article-${id}`,
          };
          (record.publicationInstant === undefined ? pending.undatedBuffer : pending.datedBuffer).push(accepted);
        }
        pending.datedBuffer.sort((a, b) =>
          b.publicationInstant! - a.publicationInstant! || a.encounterOrder - b.encounterOrder);
        pending.nextPage++;
        pending.sourceExhausted = page.rawCount < 10;
        this.advance();
      },
      error: () => {
        if (this.state === 'disposed' || this.pending !== pending) return;
        this.active = false;
        this.state = this.appending ? 'append-error' : 'initial-error';
        this.changed();
      },
    }));
  }

  private commit(pending: ArticleCheckpoint): void {
    const batch = pending.datedBuffer.splice(0, 10);
    if (pending.sourceExhausted && batch.length < 10) {
      batch.push(...pending.undatedBuffer.splice(0, 10 - batch.length));
    }
    if (!batch.length && !pending.displayed.length && pending.sourceHadRecords) {
      this.active = false;
      this.pending = undefined;
      this.state = 'initial-error';
      this.changed();
      return;
    }
    pending.displayed.push(...batch);
    pending.hasMore = pending.datedBuffer.length + pending.undatedBuffer.length > 0;
    this.committed = structuredClone(pending);
    this.displayed = [...pending.displayed];
    this.hasMore = pending.hasMore;
    this.pending = undefined;
    this.active = false;
    this.state = this.displayed.length ? 'ready' : 'empty';
    this.changed(this.appending ? batch[0]?.sessionKey : undefined);
  }
}
