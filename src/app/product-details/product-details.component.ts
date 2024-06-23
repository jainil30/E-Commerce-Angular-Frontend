import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart.actions';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<{ cart: CartItem[] }>
  ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(productId).subscribe((data: Product) => {
      this.product = data;
    });
  }

  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }
}
