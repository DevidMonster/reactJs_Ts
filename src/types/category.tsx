import { IProducts } from "./products";

export interface ICategory {
    _id: string,
    name: string,
    products: string[] | IProducts[],
}