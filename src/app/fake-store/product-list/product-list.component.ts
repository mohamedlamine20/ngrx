import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { loadProduct } from '../state/product.action';
import { getProduct } from '../state/product.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  constructor(private store: Store<AppState>){

  }
  ngOnInit(): void {
    this.products$ = this.store.select(getProduct);
    
    this.store.dispatch(loadProduct());
  }

}
