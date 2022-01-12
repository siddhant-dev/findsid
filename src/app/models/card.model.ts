export interface Card {
    id:number;
    typeOf: string;
    cover_image: string;
    title: string;
    description: string;
    tag: string;
    published_date: string;
    url?: string;
}