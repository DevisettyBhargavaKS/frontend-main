import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { StorageService } from './storage.service';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient,private storageService:StorageService) { }

  getAllCart(): Observable<AppResponse> {
     let userId= this.storageService.getLoggedInUser().id;
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/`+userId);
  }
  checkout(body:any): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/order`,body);
  }
  addAddress(address: Address) {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/user/address`,address);

  }
}
