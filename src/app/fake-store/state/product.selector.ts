import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";

const getProductState = createFeatureSelector<ProductState>('product');

export const getProduct = createSelector(getProductState,(state)=>{
    return state.product;
})