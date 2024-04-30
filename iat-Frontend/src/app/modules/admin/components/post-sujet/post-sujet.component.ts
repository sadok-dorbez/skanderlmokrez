// post-sujet.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-sujet',
  templateUrl: './post-sujet.component.html',
  styleUrls: ['./post-sujet.component.css']
})
export class PostSujetComponent implements OnInit {

  postSujetForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.postSujetForm = this.fb.group({
      title: [null, Validators.required],
      criteres: [null, Validators.required],
      description: [null, Validators.required],
      duree: [null, Validators.required],
      nombre: [null, Validators.required]
    });
  }

  postSujet() {
    console.log(this.postSujetForm.value);
    const formData: FormData = new FormData();

    // Parcourez les champs de formulaire et ajoutez-les à FormData
    Object.keys(this.postSujetForm.controls).forEach(key => {
      const control = this.postSujetForm.get(key);
      if (control !== null && control.value !== null) {
        formData.append(key, control.value);
      }
    });

    console.log(formData);
    this.adminService.addSujet(formData).subscribe(
      (res) => {
        this.message = 'Car posted successfully';
        console.log(res);
        this.router.navigateByUrl('/admin/dashboard');
        // Afficher le message pendant 5 secondes
        setTimeout(() => {
          this.message = '';
        }, 5000);
      },
      error => {
        this.message = 'Error while posting car';
        console.error(error);
      }
    );
  }
}
