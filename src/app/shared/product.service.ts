import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
}
