import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  getProducts() {
    return this.httpClient.get(
      `${environment.apiBaseURL}/products`,
      this.authService.commonHeadersWithoutAuth
    );
  }

  getProductDetails(product_id: string) {
    return this.httpClient.get(
      `${environment.apiBaseURL}/products/${product_id}`,
      this.authService.commonHeadersWithoutAuth
    );
  }
}
