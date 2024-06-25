import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginDetails = {
    email: "",
    password: ""
  }

  constructor(private authService: AuthService) {}

  handleLogin() {
    this.loginDetails = {
      email: this.loginDetails.email.trim(),
      password: this.loginDetails.password.trim()
    }
    if(this.loginDetails.email != '' && this.loginDetails.password != '') {
      this.authService.loginUser(this.loginDetails)
    }else {
      alert('Please enter valid login details');
    }
  }
}


