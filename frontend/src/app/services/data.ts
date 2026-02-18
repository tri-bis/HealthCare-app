import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService { // Renamed from 'Data' to 'DataService'
  private apiUrl = 'http://localhost:3000/api'; // Your backend URL

  constructor(private http: HttpClient) { }

  // This is the missing method that fetches the data
  getDepartmentsWithDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departments-with-doctors`);
  }

    bookAppointment(appointmentData: any): Observable<any> {
    // This sends a POST request to your backend's appointment route
    return this.http.post(`${this.apiUrl}/appointments`, appointmentData);
  }

}