import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service'; 
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

interface Response {
  responseText: string;
  isCorrect: boolean;
 }
@Component({
 selector: 'app-question',
 templateUrl: './question.component.html',
 
})
export class QuestionComponent {
 question = {
    questionText: '',
    responses: [] as Response[] 
 };
 

 constructor(private questionService: QuestionService , private route: ActivatedRoute, private router: Router) {}
 
 addResponse() {
  this.question.responses.push({ responseText: '', isCorrect: false });
 }
 
 removeResponse(index: number) {
  this.question.responses.splice(index, 1);
 }


 
selectedTestId: number =0; 


selectTest(testId: number) {
  this.selectedTestId = testId;
}

ngOnInit(): void {
  this.route.params.subscribe(params => {
     this.selectedTestId = +params['testId']; 
  });
 }
 

 submitQuestion() {
  console.log('Submitting question with testId:', this.selectedTestId);
  this.questionService.addQuestionWithResponses(this.selectedTestId, this.question).subscribe(
     response => {
       console.log('Question and responses saved successfully', response);
       this.router.navigate(['/admin/test']);
     },
     error => {
       console.error('Error saving question and responses', error);
     }
  );
 }
 
 
 
}