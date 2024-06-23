import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart.actions';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private store: Store<{ cart: CartItem[] }>) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }
}
