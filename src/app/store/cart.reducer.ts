import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, updateQuantity } from './cart.actions';
import { CartItem } from '../models/cart-item';

export const initialState: CartItem[] = [];

const _cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const existingItem = state.find(item => item.product.id === product.id);
    if (existingItem) {
      return state.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...state, { product, quantity: 1 }];
    }
  }),
  on(removeFromCart, (state, { productId }) => state.filter(item => item.product.id !== productId)),
  on(updateQuantity, (state, { productId, quantity }) => state.map(item =>
    item.product.id === productId ? { ...item, quantity } : item
  ))
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
