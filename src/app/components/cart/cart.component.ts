import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = []

  address: string = ""
  payment_mode: string = ""

  totalItems: number = 0
  totalAmount: number = 0

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit() {
    this.getCarts()
  }

  getCarts = () => {
    const promise = this.cartService.getCart()
    if(promise) {
      promise.subscribe({
        next: (response: any) => {
          if(Array.isArray(response)) {
            this.cartItems = response
          }else {
            alert('Failed to get cart')
            console.log(response)
          }
        },
        error: (e: any) => {
          alert("Failed to get cart");
          console.error(e);
        },
        complete: () => {}
      })
    }
  }

  handleQtyUpdate = (product_id: string, qty: number) => {
    if(product_id != '' && qty >= 0) {
      const promise = this.cartService.updateCartQty(product_id, qty)
      if(promise) {
        promise.subscribe({
          next: (response: any) => {
            if(response._id) {
              this.getCarts()
            }else {
              console.log('Failed to update cart', response)
              if(response.error) {
                  alert(response.error);
              }
            }
          },
          error: (e: any) => {
            alert('Add to cart failed');
            console.error(e);
          },
          complete: () => {}
        })
      }
    }
  }

  handlePlaceOrder = () => {
    if(this.cartItems && Array.isArray(this.cartItems) && this.cartItems.length > 0 && this.address.trim() != '' && this.payment_mode.trim() != '') {
      let carts = [...this.cartItems]
      const promise = this.orderService.placeOrder(carts.map((c: any) => c._id), this.address.trim(), this.payment_mode.trim(), `₹ ${this.totalAmount} Cash`)
      if(promise) {
        promise.subscribe({
          next: (response: any) => {
            if(response._id) {
              alert('Order Placed Successful')
              this.getCarts()
            }else {
              alert('Failed to get cart')
              console.log(response)
            }
          },
          error: (e: any) => {
            alert("Failed to get cart");
            console.error(e);
          },
          complete: () => {}
        })
      }
    }else {
      alert('Order details are invalid')
    }
  }
}
