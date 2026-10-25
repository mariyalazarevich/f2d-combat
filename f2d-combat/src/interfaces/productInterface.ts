export interface IProduct {
    _id: string,
    name: string,
    description: string,
    price: number,
    image: string,
    category: string[],
    features:  string,
    quantity: number,
    article: string,
    inStock: boolean,
}