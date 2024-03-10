import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {
  private imageUrl = 'http://localhost:3000/api/upload-image'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData): Observable<any> {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');

    // Check if a token exists
    if (token) {
      // Include the JWT token in the headers
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Send the POST request with headers
      return this.http.post(this.imageUrl, formData, { headers });
    } else {
      // Handle the case where there's no token (not authenticated)
      return new Observable(observer => {
        observer.error('No JWT token found.');
      });
    }
  }
}

