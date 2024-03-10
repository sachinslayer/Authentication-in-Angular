import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable,throwError,catchError} from 'rxjs';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
interface Data{
  
  email:string,
  password:string

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private isAuthenticate = false;
  private api = 'http://localhost:3000/profile';
  private apiUrl = 'http://localhost:3000/api/auth/login';
  private url='http://localhost:3000/api/auth/register'
  private Uri = 'http://localhost:3000/api/auth';

  
 
  constructor(private http: HttpClient,private router: Router) { }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        alert(`${error.error}`)
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  resetPassword(email:string): Observable<any> {
    const body = { email };

    return this.http.post(`${this.Uri}/forgot-password`, body);
  }
  resetPasswordWithToken(token: string, newPassword: string): Observable<any> {
    const body = { resetToken: token, newPassword };
    return this.http.post(`${this.Uri}/reset-password`, body);
  }
  getProfileData(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(this.api, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  

login(data:Data):Observable<any>{
  return this.http.post(this.apiUrl,data) .pipe(
    catchError(this.handleError)
    );
    
  
}
logout(): void {
  // Perform logout actions here (e.g., clearing local storage)
  localStorage.removeItem('token');
  this.isAuthenticate = false;
}

signup(data:Data):Observable<any>{
 return this.http.post(this.url,data).pipe(
  catchError(this.handleError)
  );
}




getToken(): string | null {
  const token = localStorage.getItem('token');
  this.isAuthenticate = !!token; // Set isAuthenticate to true if a token exists
  return token;
}

isTokenExpired(token: string): boolean {
  const decodedToken: any = jwt_decode(token);
  const currentTime = new Date().getTime() / 1000; // Convert to seconds

  return decodedToken.exp < currentTime;
}

isAuthenticated(): boolean {
  const token = this.getToken();
  
  if (token && !this.isTokenExpired(token)) {
    return true;
  }

  // Clear the token if it's expired or doesn't exist
  this.logout();
  return false;

}


isLoggedIn(): boolean {
  return this.isAuthenticate;
}







}
