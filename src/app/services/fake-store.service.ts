import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../fake-store/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeStoreService {
   url='https://fakestoreapi.com/products';
  constructor(private http:HttpClient) { }

   getAll():Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
   }

   getOne(id:number):Observable<Product>{
   return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
   }



}
