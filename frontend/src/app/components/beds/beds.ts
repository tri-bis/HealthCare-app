import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BedService } from '../../services/bed.service';
import { Bed, BedStats } from './bed.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bed-management',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './beds.html',
  styleUrls: ['./beds.css']
})
export class Beds implements OnInit {
  stats: BedStats | undefined;
  beds: Bed[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private bedService: BedService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Fetch statistics
    this.bedService.getBedStats().subscribe({
      next: (data) => { this.stats = data; },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.errorMessage = 'Could not load statistics.';
      }
    });

    // Fetch the list of beds
    this.bedService.getBeds().subscribe({
      next: (data) => {
        this.beds = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading beds list:', err);
        this.errorMessage = 'Could not load the list of beds.';
        this.isLoading = false;
      }
    });
  }
}