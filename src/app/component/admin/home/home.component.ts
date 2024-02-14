import { Component } from '@angular/core';
import { Productlist } from 'src/app/model/productlist';
import { UserDetail } from 'src/app/model/user-details';
import { Userproducts } from 'src/app/model/userproducts';
import { AproductService } from 'src/app/service/aproduct.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  totalUsers = 0;
  totalProduct=0;
  constructor(
    private userservice:UserService,
    private aproductservice:AproductService
  ){}

  ngOnInit(): void {
    this.userservice.getAllUserDetails().subscribe({
      next: (response: any) => {
        let users: UserDetail[] = response.data;
        this.totalUsers = users.length;
      },
      error: (err: any) => {
        console.error('Error loading total users:', err);
      },
    });


this.aproductservice.getAllProduct().subscribe({
  next: (response: any) => {
    let products: Productlist = response.data;
    this.totalProduct = products.length;
  },
  error: (err) => {
    console.error('Error loading total cloths:', err);
  },
});
}
}


