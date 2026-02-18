import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {
  doctorData = {
    id: '',
    password: '',
    name: '',
    department: '',
    specialization: '',
    email: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onRegisterDoctor() {
    if (!this.doctorData.id || !this.doctorData.password || !this.doctorData.name || !this.doctorData.department) {
      this.errorMessage = 'All fields are required.';
      this.successMessage = '';
      return;
    }

    // Get existing doctors from localStorage
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');

    // Check if doctor ID already exists
    if (doctors.some((doc: any) => doc.id === this.doctorData.id)) {
      this.errorMessage = 'Doctor ID already exists.';
      this.successMessage = '';
      return;
    }

    // Add new doctor
    doctors.push({ ...this.doctorData });
    localStorage.setItem('doctors', JSON.stringify(doctors));

    this.successMessage = 'Doctor registered successfully!';
    this.errorMessage = '';
    this.doctorData = { id: '', password: '', name: '', department: '', specialization: '', email: '' };
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
