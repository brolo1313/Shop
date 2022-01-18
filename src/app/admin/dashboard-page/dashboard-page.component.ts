import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products:any=[]
  productName!:any
  pSub:Subscription | undefined
  rSub:Subscription | undefined

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe( products => {
      this.products = products;
    })
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe();
    }

    if(this.rSub){
      this.rSub.unsubscribe();
    }
  }

  remove(id:any){
    this.rSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter((product:any) => 
        product.id !== id
       
      )
    })
  }

}
