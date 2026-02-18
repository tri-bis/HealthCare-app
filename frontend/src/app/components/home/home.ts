import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  isLoginViewActive = false;
  currentView = '';
  errorMessage = '';
  successMessage = '';

  patientLoginData = { email: '', password: '' };
  doctorLoginData = { email: '', password: '' };
  adminLoginData = { username: '', password: '' };
  patientRegisterData = { fullName: '', email: '', password: '' };

  // --- Properties for SOS functionality ---
  sosMessage: string | null = null;
  isSosError: boolean = false;
  
  private http = inject(HttpClient);
  private router = inject(Router);
  // Use a base URL for better flexibility
  private API_BASE_URL = 'http://localhost:3000/api';

  private resetMessages() {
    this.errorMessage = '';
    this.successMessage = '';
    // Also reset SOS message when switching views
    this.sosMessage = null;
  }

  showForm(role: 'patient' | 'doctor' | 'admin') {
    this.resetMessages();
    this.isLoginViewActive = true;
    if (role === 'patient') {
      this.currentView = 'patientLogin';
    } else if (role === 'doctor') {
      this.currentView = 'doctorLogin';
    } else if (role === 'admin') {
      this.currentView = 'adminLogin';
    }
  }

  showSelection() {
    this.resetMessages();
    this.isLoginViewActive = false;
    this.currentView = '';
  }

  switchView(view: string) {
      this.resetMessages();
      this.currentView = view;
  }

  // --- NEW METHOD: Send Emergency SOS ---
  sendSOS(): void {
    this.sosMessage = 'Getting your location...';
    this.isSosError = false;

    if (!navigator.geolocation) {
      this.sosMessage = 'Geolocation is not supported by your browser.';
      this.isSosError = true;
      return;
    }

    // 1. Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.sosMessage = 'Location found. Sending SOS...';

        // 2. Send location to your backend SOS endpoint
        this.http.post(`${this.API_BASE_URL}/sos`, { lat, lng })
          .subscribe({
            next: (res: any) => {
              this.sosMessage = res.message || '✅ SOS sent successfully!';
              this.isSosError = false;
            },
            error: (err) => {
              this.sosMessage = err.error?.message || '❌ Failed to send SOS.';
              this.isSosError = true;
            }
          });
      },
      (error) => {
        // Handle if user denies location access
        console.error('Geolocation Error:', error);
        this.sosMessage = ' Unable to get location. Please allow location access.';
        this.isSosError = true;
      }
    );
  }
  // ----------------------------------------

  onPatientRegister() {
    this.resetMessages();
    this.http.post(`${this.API_BASE_URL}/auth/patient/register`, this.patientRegisterData)
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Registration successful! You can now log in.';
          this.switchView('patientLogin');
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.msg || 'Registration failed. Please try again.';
        }
      });
  }

  onPatientLogin() {
    this.resetMessages();
    if (!this.patientLoginData.email || !this.patientLoginData.password) {
        this.errorMessage = "Email and password are required.";
        return;
    }
    this.http.post(`${this.API_BASE_URL}/auth/patient/login`, this.patientLoginData)
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Login successful! Redirecting...';
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.msg || 'Login failed. Check your credentials.';
        }
      });
  }

  onDoctorLogin() {
    this.resetMessages();
    if (!this.doctorLoginData.email || !this.doctorLoginData.password) {
        this.errorMessage = "Doctor ID and password are required.";
        return;
    }

    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doctor = doctors.find((doc: any) => doc.id === this.doctorLoginData.email && doc.password === this.doctorLoginData.password);

    if (doctor) {
      this.successMessage = 'Login successful! Redirecting...';
      localStorage.setItem('currentDoctor', JSON.stringify(doctor));
      this.router.navigate(['/doctor-home']);
    } else {
      this.errorMessage = 'Invalid Doctor ID or password.';
    }
  }

  onAdminLogin() {
    this.resetMessages();
    if (!this.adminLoginData.username || !this.adminLoginData.password) {
        this.errorMessage = "Username and password are required.";
        return;
    }

    if (this.adminLoginData.username === 'admin' && this.adminLoginData.password === '12345') {
      this.successMessage = 'Login successful! Redirecting...';
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}
