import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

interface Data{
  
  email:string,
  username:string

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileData: Data = { email: '', username: '' };


  constructor(private authService: AuthService) { }
  ngOnInit() {
    // Fetch profile data when the component is initialized
    this.authService.getProfileData().subscribe(
      (data: Data) => {
        this.profileData = data;
      },
      (error: any) => {
        if (error.status === 401) {
          console.error('Unauthorized error:', error);
          // Handle unauthorized access
        } else {
          console.error('Error fetching profile data:', error);
          // Handle other errors
        }
      }
    );
  }
}
