import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  regInfo: RegDetails = {
    name: "",
    email: "",
    password: ""
  }

  constructor(private authService: AuthService) {}

  registerUser() {
    this.regInfo = {
      name: this.regInfo.name.trim(),
      email: this.regInfo.email.trim(),
      password: this.regInfo.password.trim()
    }
    if(this.regInfo.name != '' && this.regInfo.email != '' && this.regInfo.password != '') {
      this.authService.loginUser(this.regInfo)
    }else {
      alert('Please enter valid registration details');
    }
  }
}

export type RegDetails = {
  name: string,
  email: string,
  password: string
} 
