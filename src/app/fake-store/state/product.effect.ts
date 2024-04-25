import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadProduct, loadProductSuccess } from "./product.action";
import { map, mergeMap } from "rxjs";
import { FakeStoreService } from "src/app/services/fake-store.service";

@Injectable()
export class ProductEffects{
 
    constructor(private action$:Actions,private productService:FakeStoreService){
    }


    loadProduct$ = createEffect (()=>{
        return this.action$.pipe(
            ofType(loadProduct),
            mergeMap((action)=>{
             return this.productService.getAll().pipe(
               map(data=>{
                
               return loadProductSuccess({product : data})
              })
             )
            })
        )
    }); 


    
   


}