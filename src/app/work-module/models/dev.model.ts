import { SafeHtml } from "@angular/platform-browser";

export interface Articles {
    id?: number;
    title: string;
    description: string;
    published_date: string;
    cover_image: string;
    tags: readonly string[];
    typeOf: 'article';
    body_html?: SafeHtml;
}

export interface ListingArticle {
    source: Articles;
    publicationInstant?: number;
}

export interface ArticlePage {
    rawCount: number;
    records: readonly ListingArticle[];
}

export class ArticlesClass {
    constructor(public articles: Articles[], public err: any = null) { }
}