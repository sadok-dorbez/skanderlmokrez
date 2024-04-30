import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Test } from '../../../models/testModel';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  addTestForm!: FormGroup;
  sujetId: any;

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {this.sujetId = this.route.snapshot.paramMap.get('sujetId');
    this.addTestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, Validators.required]
    });
  }

  onSubmit(): void {
    const test: Test = this.addTestForm.value;
    this.addTestToSujet(test, this.sujetId).subscribe({
      next: (response: Test) => {
        console.log('Test added successfully!', response);
        this.router.navigate(['/admin/test']);
      },
      error: (err: any) => {
        console.error('Error adding test:', err);
      }
    });
  }
  

  addTestToSujet(data: Test, sujetId: any): Observable<Test> {
    return this.testService.addTestToSujet(data, sujetId);
  }
}
