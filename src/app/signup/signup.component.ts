import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  userSignup() {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.signup(data).subscribe((result: any) => {
      this.router.navigate(['/login']);
    });
  }
}
