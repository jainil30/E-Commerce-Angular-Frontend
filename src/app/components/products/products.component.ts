import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, DoCheck {
  products: any[] = []
  cart: any[] = []

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.getProductList()
    this.getCarts()
  }

  ngDoCheck() {
    if(this.products && this.cart) {
      let carts = [...this.cart]
      this.products.filter((p: any) => { p.qty = carts.find((c: any) => c.product._id === p._id) != undefined?carts.find((c: any) => c.product._id === p._id).quantity:0; return true; })
    }
  }

  getProductList = () => {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        if(Array.isArray(response)) {
          this.products = response
        }else {
          alert('Failed to get products')
          console.log(response)
        }
      },
      error: (e) => {
        alert("Failed to get products");
        console.error(e);
      },
      complete: () => {}
    })
  }

  getCarts = () => {
    const promise = this.cartService.getCart()
    if(promise) {
      promise.subscribe({
        next: (response: any) => {
          if(Array.isArray(response)) {
            this.cart = response
          }else {
            alert('Failed to get cart')
            console.log(response)
          }
        },
        error: (e) => {
          alert("Failed to get cart");
          console.error(e);
        },
        complete: () => {}
      })
    }
  }

  handleAddToCart = (product_id: string) => {
    if(product_id != '') {
      const promise = this.cartService.addToCart(product_id)
      if(promise) {
        promise.subscribe({
          next: (response: any) => {
            if(response._id) {
              alert('Item added to cart');
              this.getCarts()
            }
          },
          error: (e) => {
            alert('Add to cart failed');
            console.error(e);
          },
          complete: () => {}
        })
      }
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
          error: (e) => {
            alert('Add to cart failed');
            console.error(e);
          },
          complete: () => {}
        })
      }
    }
  }
}
