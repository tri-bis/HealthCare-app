import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data';

@Component({ 
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './departments.html',
  styleUrls: ['./departments.css']
})
export class Departments implements OnInit {
  departments: any[] = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getDepartmentsWithDoctors().subscribe({
      
      next: (data: any) => {
        this.departments = data;
        console.log('Data received from backend:', data);
      },
      
      error: (err: any) => {
        console.error('Failed to fetch data from backend', err);
      }
    });
  }
}