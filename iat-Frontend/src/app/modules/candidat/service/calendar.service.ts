import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class CalendarService {
 private apiUrl = 'http://localhost:8080/api/calendar';

 constructor(private http: HttpClient) {}

 saveDate(date: Date, userId: number): Observable<any> {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const url = `${this.apiUrl}?userId=${userId}`;

  return this.http.post(url, { selectedDate: formattedDate });
}

}
