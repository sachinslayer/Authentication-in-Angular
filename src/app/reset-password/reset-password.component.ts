import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService,private router:Router) {}

  ngOnInit() {
    // Retrieve the reset token from the URL
    this.token = this.route.snapshot.paramMap.get('token') as string;
    console.log('token:',this.token)
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      // Handle password mismatch
      console.log('Passwords do not match.');
      alert("password do not match")
      return;
    }

    this.authService.resetPasswordWithToken(this.token, this.newPassword).subscribe((response: any) => {
      // Handle the response (e.g., show a success message)
      console.log('Password reset successfully.');
      alert('password reset successfully')
      this.router.navigate(['/login'])
    } ,(error) => {
      // Handle error response from the server
      if (error.status === 400) {
        console.log('Error:', error.error.message);
        alert(error.error.message);
      } else {
        // Handle other types of errors (e.g., network issues)
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  }

}
