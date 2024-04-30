import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CandidatService} from "../../service/candidat.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit{
  idSujet: any;
  idCandidature: any;
  sujetDetails: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(private candidatService: CandidatService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.idCandidature = params.get('id');
      this.getSujetById(Number(this.idSujet));
    });
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.candidatService.uploadCv(this.idCandidature, this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

}
