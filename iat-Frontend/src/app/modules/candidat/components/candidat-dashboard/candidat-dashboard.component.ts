import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatService } from '../../service/candidat.service';

@Component({
  selector: 'app-candidat-dashboard',
  templateUrl: './candidat-dashboard.component.html',
  styleUrls: ['./candidat-dashboard.component.css']
})
export class CandidatDashboardComponent {

  sujets: any = [];
  result: string = '';

  constructor(private candidatService:CandidatService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.result = params['result'];
    });
  
    this.getAllSujets();
  }

  getAllSujets(){
    this.candidatService.getAllSujets().subscribe({
      next: (sujets: any[]) => {
        this.sujets = sujets;
        console.log('Sujets fetched successfully!')
      },
      error: (err: any) => {
        console.error('Error fetching sujets:', err);
      }
    });
  }

}
