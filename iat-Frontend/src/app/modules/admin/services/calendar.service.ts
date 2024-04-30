import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendar } from '../../models/calendarModel';
import { Injectable } from '@angular/core';
import { Status } from '../../models/statusModel';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:8080/api/calendars'; 
  

  constructor(private http: HttpClient) { }

  getAllCalendars(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.apiUrl);
  }

  changeStatus(id: number, newStatus: Status): Observable<Calendar> {
    const url = `${this.apiUrl}/${id}`;
    const body = { status: newStatus };
    return this.http.put<Calendar>(url, body, { params: { newStatus } });
  }
}