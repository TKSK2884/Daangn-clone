export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    registered_date?: number;
    likes: number;
    chats: number;
    views?: number;

    images: string[];
    registered_by: User;

    is_hidden?: boolean;
}

export interface User {
    name?: string;
    location: string;
    temperature?: number;
    thumbnail?: string;
}

export interface Keywords {
    name: string;
    rank_changed: number;
    current_rank: number;
}
