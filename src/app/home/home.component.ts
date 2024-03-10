import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch all images from the backend
    this.http.get<any[]>('http://localhost:3000/api/getall').subscribe(
      (data) => {
        this.images = data.map(image => ({
          imageData: 'data:image/jpeg;base64,' + this.arrayBufferToBase64(image.image.data),
          likes: image.likes || 0  // Assuming 'likes' property is available in your data model
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binaryArray = new Uint8Array(buffer);
    const binary = Array.from(binaryArray).map(byte => String.fromCharCode(byte)).join('');
    return btoa(binary);
  }

  likeImage(image: any): void {
    // Send a request to your backend API to increment the like count for the given image
    // Update the 'likes' property locally and on the server side
    this.http.post('http://localhost:3000/api/like-image', { imageId: image.id }).subscribe(
      (response) => {
        // Update the local likes count
        image.likes += 1;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
