import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any[] = [];
  constructor(private taskService: TaskService ,private router:Router) {}
  
  ngOnInit(): void {
    this.loadTasks();
  }

  createTask(): void {
    this.taskService.createTask().subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
  join(){
    this.router.navigate(['contest']);
  }

}
