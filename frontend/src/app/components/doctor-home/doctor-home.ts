import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './doctor-home.html',
  styleUrls: ['./doctor-home.css']
})
export class DoctorHome {
  sidebarExpanded = window.innerWidth > 768;

  onToggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
