import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core'; // <-- Import OnInit, HostListener
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit { // <-- Implement OnInit
  
  // Renamed @Output for clarity
  @Output() sidebarToggled = new EventEmitter<void>(); 

  isCollapsed = false;

  // --- Added properties for responsive logic ---
  private isMobile = false;
  private mobileBreakpoint = 992; // IMPORTANT: Must match your CSS @media query

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // --- Added OnInit and HostListener for responsive logic ---
  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.checkScreenSize();
  }

  /**
   * Checks the screen size and automatically collapses the sidebar
   * if transitioning to a mobile view.
   */
  private checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= this.mobileBreakpoint;

    // If we just transitioned from desktop to mobile, auto-collapse
    if (this.isMobile && !wasMobile) {
      this.isCollapsed = true;
      this.sidebarToggled.emit(); // Notify parent
    }
  }

  /**
   * This method should be called by your hamburger toggle button
   * (click)="toggleSidebar()" in your sidebar.html
   */
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(); // Notify parent
  }
  
  /**
   * This method closes the sidebar when a nav link is clicked on mobile.
   * Add (click)="onMobileLinkClick()" to your <a> tags in sidebar.html
   */
  onMobileLinkClick(): void {
    if (this.isMobile && !this.isCollapsed) {
      this.isCollapsed = true;
      this.sidebarToggled.emit(); // Notify parent
    }
  }

  /**
   * Logs the user out and navigates to the home page.
   */
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}