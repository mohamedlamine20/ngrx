import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effect';
import { productReducer } from './state/product.reducer';
import { StoreModule } from '@ngrx/store';



const routes: Routes = [
  {

      path: '', component: ProductListComponent
  }
]

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,EffectsModule.forFeature([ProductEffects]),RouterModule.forChild(routes), StoreModule.forFeature('product', productReducer)]
})
export class FakeStoreModule { }
