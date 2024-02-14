import { Component, OnInit } from '@angular/core';
import { Cartresp } from 'src/app/model/cartresp';
import { AppResponse } from 'src/app/model/appResponse';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserproductService } from 'src/app/service/userproduct.service';
import { Cart } from 'src/app/model/cart';
import { Userproducts } from 'src/app/model/userproducts';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  UserCart: Cartresp[] = [];
  cart: any[] = [];
  INITIAL_ADDRESS: Address = {
    address: '',
    city: '',
    zipcode: 0,
    userId: 0,
  };
  Address: string='';
  City: string='';
  Zipcode: number=0;
  constructor(
    private cartService: CartService,
    private userproductservice: UserproductService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.cartService.getAllCart().subscribe((response: AppResponse) => {
      this.cart = response.data;
      console.log(this.cart, 'cartshowing');
    });

    // (err) => {
    //   console.error('An error occurred:', err);
    // }
  }
  getCartItemCount(id: number): number {
    let count: number = this.UserCart.find(
      (cartItem) => cartItem.item.id === id
    )?.count!;
    return count;
  }

 

  checkout(): void {
    
    let checkOutData: any = {
      userId: this.storageService.getLoggedInUser().id,
      addressId: 1,
      productId: 9,
    };

   
    this.cartService.checkout(checkOutData).subscribe({
      
      next: (resp: any) => console.log(resp),
    });
  }
  onSubmit(form: any) {

  let address:Address={
    address: this.Address,
    city:this.City,
    zipcode: this.Zipcode,
    userId:this.storageService.getLoggedInUser().id
  }
  console.log(form.Address);
  console.log(form.city);

    this.cartService.addAddress(address).subscribe({
      next: (response: AppResponse) => {
        form.reset();
      },
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
