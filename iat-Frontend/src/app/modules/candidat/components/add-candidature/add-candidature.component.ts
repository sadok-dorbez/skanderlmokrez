import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidatService } from '../../service/candidat.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {StorageService} from "../../../../auth/services/storage/storage.service";

@Component({
  selector: 'app-add-candidature',
  templateUrl: './add-candidature.component.html',
  styleUrls: ['./add-candidature.component.css']
})
export class AddCandidatureComponent implements OnInit {
  idUser: any;
  idSujet: any;
  idCandidature: any;
  lettreMotivation!: string;
  sujetDetails: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  showlettreMotivation=true;
  showUpload = false;

  constructor(private candidatService: CandidatService,
              private activatedroute: ActivatedRoute,
              private storageService: StorageService,
              private router: Router) {}

  ngOnInit(): void {
    this.idUser = this.storageService.getUser().id;
    console.log(this.idUser);
    this.activatedroute.paramMap.subscribe(params => {
      this.idSujet = params.get('id');
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

  onSubmit(candidatureForm: NgForm) {
    this.candidatService.addCandidature(this.idUser, this.idSujet, candidatureForm.value).subscribe({
      next: (response: any) => {
        this.idCandidature = response.id;
        console.log('Candidature added successfully:', response);
        this.showlettreMotivation =false;
        this.showUpload = true;
      },
      error: (err: any) => {
        console.error('Error adding candidature:', err);
      }
    });
  }

}
