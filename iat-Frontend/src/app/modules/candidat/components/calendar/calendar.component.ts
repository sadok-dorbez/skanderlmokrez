import { Component } from '@angular/core';
import { CalendarService } from '../../service/calendar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  viewDate: Date = new Date();
  result: string = '';
  userId: number = 2;

  constructor(
    private calendarService: CalendarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.result = params['result'];
    });
  }

  dayClicked({ date }: { date: Date }): void {
    this.calendarService.saveDate(date, this.userId).subscribe(response => {
      console.log(response);
      this.router.navigate(['/candidat/dashboard'], { queryParams: { date: date.toISOString() } });
    });
  }

  monthSelected({ date }: { date: Date }): void {
    this.viewDate = date;
  }
}
