import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Aproduct } from 'src/app/model/aproduct';
import { AppResponse } from 'src/app/model/appResponse';
import { AproductService } from 'src/app/service/aproduct.service';
import { Userproducts } from 'src/app/model/userproducts';

@Component({
  selector: 'app-aproduct',
  templateUrl: './aproduct.component.html',
})
export class AproductComponent implements OnInit{
  error: string = "";
  itemsperpage = 5;
  showproducts: Userproducts[]=[];
  userproducts:Userproducts[]=[];
  totalPages: number[] = [];
  currentpage = 1;
  aproduct:Aproduct[]=[];
  product:Aproduct={
    id:0,
    title:"",
    description:"",
    price:0,
  };
  constructor(private aproductservice:AproductService){}
  ngOnInit(): void {
    this.retrivedata();
    
    
  }
  retrivedata(){
    this.getAllProducts();
  }
  getAllProducts(){
    this.aproductservice.getaproducts().subscribe({
      next: (response: AppResponse) => {
       
        this.userproducts=response.data;
        this.calculateTotalPages();
       
      },
      error:(err)=>{
        let message:string=err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  
  calculateTotalPages() {
    const totalProducts = this.userproducts.length;
    const pages = Math.ceil(totalProducts / this.itemsperpage);
    this.totalPages = Array(pages)
      .fill(0)
      .map((x, i) => i + 1);
    this.changePage(1); // Display first page initially
  }

  previousPage() {
    if (this.currentpage > 1) {
      this.changePage(this.currentpage - 1);
    }
  }
  nextPage() {
    if (this.currentpage < this.totalPages.length) {
      this.changePage(this.currentpage + 1);
    }
  }
  changePage(pagenumber: number) {
    this.currentpage = pagenumber;
    const startindex = (this.currentpage - 1) * this.itemsperpage;
    const endindex = startindex + this.itemsperpage;
    this.showproducts = this.userproducts.slice(startindex, endindex);
  }


}
