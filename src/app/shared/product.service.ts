import { Product } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type = "Phone";

  constructor(private http:HttpClient) { }

  creat(product:any){
    return this.http.post(`${environment.fbDbUrl}/products.json`,product)
    .pipe(map((res:any) => {
      return{
        ...product,
        id: res.name,
        date: new Date(product.date)
      }
    }))
  }

  getAll(){
    return this.http.get(`${environment.fbDbUrl}/products.json`)
    .pipe(map ((res:any) => {
      return Object.keys(res)
      .map(key => ({ 
        ...res[key],
        id:key,
        date: new Date(res[key].date),
      }))
    }))
  }

  getById(id:any){
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
    .pipe(map ((res:Product) => {
      return{ 
        ...res,
        id,
        date: new Date(res.date!),
      }
    }))
  }

  remove(id:any){
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product:Product){
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  setType(type:any){
    this.type = type;
  }
}
