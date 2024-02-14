import { Component } from '@angular/core';
import { Aorders } from 'src/app/model/aorders';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent {
  orders: Order[] = []
  userId:number|undefined
  userOrders:Order[]=[]
  aorder:Order={
    productList:[],
  }
  constructor(private orderservice:OrderService,private storageService:StorageService){}
  ngOnInit(): void {
    this.orderservice.getOrders(this.storageService.getLoggedInUser().id).subscribe({
      next: (resp:any)=>{
        this.orders = resp.data
        console.log(this.orders);
        
      }
    })
  }
  getUsersOrder(id:number) : void{
    if(this.userId !== undefined){
      this.orderservice.getOrders(id).subscribe((response:any)=>{
        this.aorder=response.data;
      })
    }
 
  }
  setSelectedorder(aorder: Order): void {
    this.aorder = aorder;
  }

}
