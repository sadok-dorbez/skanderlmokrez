import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-sujet',
  templateUrl: './update-sujet.component.html',
  styleUrls: ['./update-sujet.component.css']
})
export class UpdateSujetComponent {

  sujetId:number=this.activatedRoute.snapshot.params["id"];
  updateForm!: FormGroup;
  message: string = '';



  constructor(private adminService:AdminService, private activatedRoute:ActivatedRoute, private fb:FormBuilder, private router:Router){}

  ngOnInit(){

    this.updateForm=this.fb.group({
      title: [null, Validators.required],
      criteres: [null, Validators.required],
      description: [null, Validators.required],
      duree: [null, Validators.required],
      nombre: [null, Validators.required],
    })
    this.getSujetById();
  }

  getSujetById(){
    this.adminService.getSujetById(this.sujetId).subscribe((res)=>{
      //console.log(res);
      const sujetDto = res;
      this.updateForm.patchValue(sujetDto);

    })
  }

  updateSujet(){
    console.log(this.updateForm.value);
    const formData: FormData = new FormData();
    
    // Parcourez les champs de formulaire et ajoutez-les à FormData
    Object.keys(this.updateForm.controls).forEach(key => {
      const control = this.updateForm.get(key);
      if (control !== null && control.value !== null) {
        formData.append(key, control.value);
      }
    });

    console.log(formData);
    this.adminService.updateSujet(this.sujetId,formData).subscribe(
      (res) => {
        this.message = 'Sujet updated successfully';
        console.log(res);
        this.router.navigateByUrl('/admin/dashboard');
        // Afficher le message pendant 5 secondes
        setTimeout(() => {
          this.message = '';
        }, 5000);
      },
      error => {
        this.message = 'Error while updating sujet';
        console.error(error);
      }
    );
  }

}


