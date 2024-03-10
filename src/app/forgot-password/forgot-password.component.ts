import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  constructor(private authservice: AuthService, private router: Router) { }
  resetPassword() {
    // Create a data object with the user's email
    const data = this.email
   

    // Call your service method to request a password reset
    this.authservice.resetPassword(data).subscribe((response: any) => {
      // Handle the response (e.g., show a success message)
      console.log('Password reset request sent successfully.');
      alert('Password reset request sent successfully.')
      
    }, (error) => {
      // Handle errors from the server
      console.error('Error requesting password reset:', error);

      // Show an alert with the error message
      if (error.status === 404 && error.error === 'User not found') {
        alert('User not found');
      } else if (error.error && error.error.message) {
        alert(`Error: ${error.error.message}`);
      } else {
        alert('An unexpected error occurred. Please contact support.');
      }
    }
    );
  }

}
