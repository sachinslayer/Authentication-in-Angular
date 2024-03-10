import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/task'; // Replace with your Express.js API URL

  constructor(private http: HttpClient) {}

  createTask(): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-task`, {});
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`);
  }
}
