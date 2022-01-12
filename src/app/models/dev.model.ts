import { SafeHtml } from "@angular/platform-browser";

export interface Articles {
    id: number;
    title: string;
    description: string;
    published_date: string;
    cover_image: string;
    tag: string;
    typeOf: string;
    body_html?: SafeHtml;
}