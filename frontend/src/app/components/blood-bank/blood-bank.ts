import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { BloodbankService } from '../../services/bloodbank.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-blood-bank',
  imports: [CommonModule,RouterLink],
  templateUrl: './blood-bank.html',
  styleUrl: './blood-bank.css'
})
export class bloodbank implements OnInit {

  bloodData: any[] = [];
  isLoading = true; 

  constructor(private bloodbankService: BloodbankService) {}

  ngOnInit(): void {
    this.bloodbankService.getBloodData().subscribe({
      next: (data) => {
        this.bloodData = data;
        console.log('Received blood data:', this.bloodData);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load blood data', err);
        this.isLoading = false;
      }
    });
  }
  getStatusColor(availability: string): string {
    // Return a default color if availability is missing
    if (!availability) return '#6c757d'; // Gray

    const status = availability.toLowerCase().trim(); // Make it lowercase and remove spaces

    if (status === 'high') {
      return '#28a745'; // Green
    } else if (status === 'moderate') {
      return '#ffc107'; // Yellow
    } else if (status === 'low') {
      return '#dc3545'; // Red
    } else {
      return '#6c757d'; // Default gray for any other value
    }
  }
}