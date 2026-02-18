import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface Appointment {
  _id: string;
  patientName: string;
  patientEmail: string;
  bookingTime: string;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './schedules.html',
  styleUrls: ['./schedules.css']
})
export class Schedules implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  
}
