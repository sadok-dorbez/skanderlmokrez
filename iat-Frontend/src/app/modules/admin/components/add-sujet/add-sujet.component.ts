import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-add-sujet',
  templateUrl: './add-sujet.component.html',
  styleUrls: ['./add-sujet.component.css']
})
export class AddSujetComponent {
  sujet = {
    title: '',
    description: '',
    criteres: '',
    technologies: '',
    startDate: '',
    endDate: '',
    nombre: 0,
    department: ''
  };

  constructor(private adminService: AdminService) {
  }

  addSujet(): void {
    this.adminService.addSujet(this.sujet).subscribe(
      (response) => {
        console.log('Sujet has been added successfully:', response);
      },
      (error) => {
        console.error('Error adding a sujet:', error);
      }
    );
  }
}

