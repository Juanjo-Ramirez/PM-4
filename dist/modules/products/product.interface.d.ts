export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl?: string;
}
export interface ProductCreate {
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl?: string;
    categories: string;
}
export interface ProductUpdate {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    imgUrl?: string;
}
export interface ProductDelete {
    id: string;
}
export interface ProductGetById {
    id: string;
}
