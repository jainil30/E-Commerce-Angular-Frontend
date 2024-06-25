import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  placeOrder(cart_ids: string[], address: string, payment_mode: string, payment_details: string) {
    if(this.authService.authToken) {
      return this.httpClient.post(
        `${environment.apiBaseURL}/orders`,
        { cart_ids, address, payment_mode, payment_details },
        this.authService.commonHeadersWithAuth
      )
    }else {
      this.router.navigateByUrl('/login')
      return null;
    }
  }
}
