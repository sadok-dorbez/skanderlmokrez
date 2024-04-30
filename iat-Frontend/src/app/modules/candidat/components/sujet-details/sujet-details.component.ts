import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CandidatService} from "../../service/candidat.service";

@Component({
  selector: 'app-sujet-details',
  templateUrl: './sujet-details.component.html',
  styleUrls: ['./sujet-details.component.css']
})
export class SujetDetailsComponent implements OnInit {
  sujetDetails: any;

  constructor(private candidatService: CandidatService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getSujetById(id);
  }

  getSujetById(id: number): void {
    this.candidatService.getSujetById(id).subscribe({
      next: (response: any) => {
        this.sujetDetails = response;
      },
      error: (err: any) => {
        console.error('Error fetching sujet details:', err);
      }
    });
  }
}
