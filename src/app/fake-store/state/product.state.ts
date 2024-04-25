import { Product } from "../product"

export interface ProductState {
    product: Product[],
    loaded:boolean
}
export const initialState: ProductState = {
    product: [],
    loaded:false
}