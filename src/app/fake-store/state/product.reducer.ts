import { createReducer, on } from "@ngrx/store";
import { initialState } from "./product.state";
import { loadProductSuccess } from "./product.action";

const _productReducer = createReducer(initialState,on(loadProductSuccess,(state,action)=>{
        return{
            ...state,
            product:action.product
        }
    })
)

export function productReducer(state: any, action: any) {
    return _productReducer(state, action);
}