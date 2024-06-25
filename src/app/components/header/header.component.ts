import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">E-Commerce Angular</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/products">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/contact">Contact</a>
                        </li>
                        @if(!this.authService.authToken) {
                          <li class="nav-item">
                              <a class="nav-link" routerLink="/login">Login</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" routerLink="/signup">Signup</a>
                          </li>
                        }
                    </ul>
                    <form class="d-flex" role="search">
                        <a type="button" class="btn btn-primary" style="width: 100" routerLink="/cart">
                            <i class="bi bi-cart-fill"></i>
                            <span class='ms-2'>Cart</span>
                        </a>
                        @if(this.authService.authToken) {
                          <button type="button" class="btn btn-primary ms-2" style="width: 100" (click)="logoutUser()">
                              <span class='me-2'>Logout</span>
                              <i class="bi bi-box-arrow-right"></i>
                          </button>
                        }
                    </form>
        </div>
      </div>
    </nav>
  `,
  styles: ``
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logoutUser = () => {
    this.authService.logoutUser()
  }
}
