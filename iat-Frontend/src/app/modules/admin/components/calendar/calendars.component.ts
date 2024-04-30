import { Component, OnInit } from '@angular/core';
import { Calendar } from '../../../models/calendarModel';
import { CalendarService } from '../../services/calendar.service';
import { Status } from '../../../models/statusModel';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarsComponent implements OnInit {
  calendars: Calendar[] =[];
  newCalendar: any = {};
  editingCalendar: any = null;
  Status = Status;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getCalendarsList();
  }

  getCalendarsList(): void {
    this.calendarService.getAllCalendars().subscribe(
      data => {
        this.calendars = data;
        console.log(this.calendars);
      },
      error => {
        console.error('Error fetching calendars:', error);
      }
    );
  }

  changeStatus(calendarId: number, newStatus: Status): void {
    this.calendarService.changeStatus(calendarId, newStatus).subscribe(
      updatedCalendar => {
        console.log('Calendar updated successfully:', updatedCalendar);
        this.updateLocalCalendarList(updatedCalendar);
      },
      error => {
        console.error('Error updating calendar:', error);
      }
    );
  }

  updateLocalCalendarList(updatedCalendar: any): void {
    const index = this.calendars.findIndex(calendar => calendar.id === updatedCalendar.id);
    if (index !== -1) {
      this.calendars[index] = updatedCalendar;
    }
  }
}
