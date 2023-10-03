export interface ButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    classes?: string;
}
export interface CardProps {
    name: string,
    category: string,
    price: string,
    image: string,
    id: string
}
export interface CategoryCardProps {
    title: string,
    img: string
}
export interface FilterParams {
    gender?: string;
    category?: string;
    rating?: string;
    price?: string;
}
export interface ApiResponse {
    brand: string,
    category: string,
    description: string,
    gender: string,
    image: string,
    name: string,
    newPrice: string,
    price: string,
    qty: string,
    quantity: string,
    rating: string,
    weight: string,
    _id: string
}
export interface QueryTuple {
    gender: string,
    category: string,
    rating: string,
    price: string
}
