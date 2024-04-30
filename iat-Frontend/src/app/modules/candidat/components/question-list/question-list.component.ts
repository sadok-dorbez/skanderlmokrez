import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../service/question-list.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Test } from '../../../models/testModel';

@Component({
 selector: 'app-question-list',
 templateUrl: './question-list.component.html',
 styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
 userId: any;
 testId: number = 1;
 questions: any[] = [];
 errorMessage: string ='';
 successMessage: string = '';
 timer: any = 15;
 remainingSeconds: number = 0;

 constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
 ) { }

 ngOnInit(): void {
   this.userId = 13;
   this.route.params.subscribe(params => {
    if (params['testId']) {
      this.testId = +params['testId'];
      console.log('id:', this.testId);

      this.questionService.getQuestionsByTestId(this.testId).subscribe(
        data => {
          this.questions = data;
          console.log('qst', this.testId, ':', this.questions);
          this.startTimer();
        },
        error => {
          this.errorMessage = 'Error fetching questions. Please try again later.';
          console.error('Error fetching questions:', error);
        }
      );
    } else {
      this.errorMessage = 'Test ID is not provided.';
    }
  });
}

 submitAnswers(): void {
  const userAnswers: any[] = [];
  this.questions.forEach(question => {
     const selectedResponse = question.responses.find((response: any) => {
       const inputElement = document.querySelector(`input[name="${question.id}"]:checked`) as HTMLInputElement;
       return inputElement?.value === response.responseId.toString();
     });
     if (selectedResponse) {
       userAnswers.push({
         questionId: question.id,
         responseId: selectedResponse.responseId,
         responseText: selectedResponse.responseText
       });
     }
  });

  forkJoin(userAnswers.map(answer =>
    this.questionService.saveResponseUser(answer.questionId,this.userId, answer.responseText)
  )).subscribe({
      next: () => {
          console.log('All answers submitted successfully');
          forkJoin([
              this.questionService.countCorrectResponseUsersByTestId(this.testId),
              this.questionService.countQuestionsByTestId(this.testId)
          ]).subscribe(([correctCount, totalCount]) => {
              const percentage = (correctCount / totalCount) * 100;
              this.successMessage = `You have ${correctCount} correct answers on ${totalCount} questions.`;
              let route = '';
              let message = '';

              if (percentage >= 70) {
                route = '/candidat/calendar';
                message = `Congratulations! You got ${percentage.toFixed(2)}% on the test.`;
              } else {
                route = '/candidat/dashboard';
                message = `Hard luck! You got ${percentage.toFixed(2)}% on the test.`;
              }

              this.router.navigate([route], { queryParams: { result: message } });
          });
      },
    error: (error) => {
        console.error('Error submitting answers:', error);
        this.errorMessage = 'Error submitting answers. Please try again later.';
    }
});
}

startTimer() {
  this.remainingSeconds = 15;

  this.timer = setInterval(() => {
    this.remainingSeconds--;

    if (this.remainingSeconds === 5) {
      const timerElement = document.getElementById('timer');
      if (timerElement) {
        timerElement.classList.add('last-5-seconds');
      }
    }

    if (this.remainingSeconds < 0) {
      clearInterval(this.timer);
      const timerElement = document.getElementById('timer');
      if (timerElement) {
        timerElement.classList.remove('last-5-seconds');
      }
      this.router.navigate(['/candidat/dashboard']);
    }
  }, 1000);
}




ngOnDestroy(): void {
  if (this.timer) {
    clearInterval(this.timer);
  }
}


}
