import { Component } from '@angular/core';
import { ImageuploadService } from '../imageupload.service';

@Component({
  selector: 'app-creativity',
  templateUrl: './creativity.component.html',
  styleUrls: ['./creativity.component.css']
})
export class CreativityComponent {
  selectedImage: File | null = null;

  constructor(private imageUploadService: ImageuploadService) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
    }
  }

  uploadImage(): void {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);

      this.imageUploadService.uploadImage(formData).subscribe(
        (response) => {
          alert('Image uploaded successfully');
         
        },
        (error) => {
          console.error('Image upload failed', error);
          alert('No image file provided');
        }
      );
    }else {
      alert(' No image file provided'); // Show error in an alert
    }
  }
}
