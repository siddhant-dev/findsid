import { Injectable } from '@angular/core';
import type { ArticleCheckpoint } from './article-list-session';

export interface ArticleListSnapshot {
  checkpoint: ArticleCheckpoint;
  sectionOffset: number;
  initiatingCardKey?: string;
  keyboard: boolean;
}

@Injectable({ providedIn: 'root' })
export class ArticleListSnapshotService {
  private snapshot?: ArticleListSnapshot;
  private returning = false;
  save(snapshot: ArticleListSnapshot): void {
    this.snapshot = structuredClone(snapshot);
    for (const records of [this.snapshot.checkpoint.displayed, this.snapshot.checkpoint.datedBuffer,
      this.snapshot.checkpoint.undatedBuffer]) {
      for (const record of records) delete record.source.body_html;
    }
    this.returning = false;
  }
  takeReturn(): ArticleListSnapshot | undefined {
    if (!this.returning || !this.snapshot) return undefined;
    this.returning = false;
    return structuredClone(this.snapshot);
  }
  enterDetail(): void { this.returning = true; }
}
