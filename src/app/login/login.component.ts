import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email: string = ''; // Declare the 'email' property
  password: string = ''; // Declare the 'password' property

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authservice.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
  userLogin() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authservice.login(data).subscribe((result: any) => {
      if (result.token) {
        localStorage.setItem("token", result.token);
        this.router.navigate(['/home']);
      }
    });
  }
  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
  redirectToForgotPassword(){
    this.router.navigate(['/forgot'])
  }
}
