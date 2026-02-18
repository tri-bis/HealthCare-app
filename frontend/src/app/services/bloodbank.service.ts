
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BloodbankService {
  private apiUrl = 'http://localhost:3000/api/bloodbank';

  constructor(private http: HttpClient) { }

  getBloodData(): Observable<any[]> { 
    return this.http.get<any[]>(this.apiUrl); 
  }
}