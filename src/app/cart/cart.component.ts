import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { updateQuantity, removeFromCart } from '../store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$: Observable<CartItem[]>;

  constructor(private store: Store<{ cart: CartItem[] }>) {
    this.cart$ = store.select('cart');
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.store.dispatch(updateQuantity({ productId: item.product.id, quantity }));
  }

  removeItem(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }
}
