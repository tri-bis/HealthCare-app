import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse for better error handling

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './doctors-list.html',
  styleUrls: ['./doctors-list.css']
})
export class DoctorsList implements OnInit {
  departmentName: string = '';
  doctors: any[] = [];
  selectedDoctor: any = null;
  appointmentDetails = {
    patientName: '',
    patientEmail: '',
    bookingTime: ''
  };

  // Property to hold the minimum selectable date and time
  minDateTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // Set the minimum date/time when the component loads
    this.setMinDateTime();

    // This existing code fetches the doctors
    this.departmentName = this.route.snapshot.paramMap.get('departmentName') || '';

    this.dataService.getDepartmentsWithDoctors().subscribe({
      next: (allDepartments: any) => {
        const targetDepartment = allDepartments.find((dept: any) => dept.name === this.departmentName);
        if (targetDepartment) {
          this.doctors = targetDepartment.doctors;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to fetch data:', err);
      }
    });
  }

  // Method to calculate and format the current date and time
  private setMinDateTime(): void {
    const now = new Date();
    
    // Adjust for the local timezone offset to ensure the time is correct
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    
    // Format the date into the 'YYYY-MM-DDTHH:mm' string required by the input
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  selectDoctor(doctor: any) {
    this.selectedDoctor = doctor;
  }

  onAppointmentSubmit() {
    const appointmentData = {
      ...this.appointmentDetails,
      doctor: this.selectedDoctor._id 
    };

    this.dataService.bookAppointment(appointmentData).subscribe({
      next: (response: any) => {
        alert('Appointment booked successfully!');
        this.appointmentDetails = { patientName: '', patientEmail: '', bookingTime: '' };
      },
      error: (err: HttpErrorResponse) => {
        alert('Failed to book appointment. Please try again.');
        console.error(err);
      }
    });
  }
}

