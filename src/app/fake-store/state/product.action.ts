import { createAction, props } from "@ngrx/store";
import { Product } from "../product";


export const LOAD_PRODUCT = '[product page]load product';
export const LOAD_PRODUCT_SUCCESS = '[product page]load product success';

export const loadProduct = createAction(LOAD_PRODUCT);

export const loadProductSuccess = createAction(LOAD_PRODUCT_SUCCESS,props<{product:Product[]}>());

