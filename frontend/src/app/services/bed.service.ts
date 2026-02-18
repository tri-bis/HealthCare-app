import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Import both interfaces from your new model file
import { Bed, BedStats } from '../components/beds/bed.model';

@Injectable({
  providedIn: 'root'
})
export class BedService {
  // Use the base URL for the beds API
  private apiUrl = 'https://healthcare-app-1sd7.onrender.com/api/beds';

  constructor(private http: HttpClient) { }

  // GETS: /api/beds/stats
  getBedStats(): Observable<BedStats> {
    return this.http.get<BedStats>(`${this.apiUrl}/stats`);
  }

  // GETS: /api/beds
  // This new function fetches the list of all individual beds
  getBeds(): Observable<Bed[]> {
    return this.http.get<Bed[]>(this.apiUrl);
  }
}