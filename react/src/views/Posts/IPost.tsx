export interface IPost {
    id: number | string
    title: string
    excerpt: string
    body: string
    created_at?: string;
    updated_at?: string;
    published_at?: string;
}

export class Post implements IPost{
    id: number | string
    title: string
    excerpt: string
    body: string
    created_at?: string;
    updated_at?: string;
    published_at?: string;

    constructor() {
        this.id = '';
        this.title = '';
        this.excerpt = '';
        this.body = '';
    }

}
