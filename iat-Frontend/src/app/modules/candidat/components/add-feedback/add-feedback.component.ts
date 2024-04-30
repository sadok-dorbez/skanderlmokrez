import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidatService } from '../../service/feed-back.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {
  userId = 2;
  feedback = {
    answer1: '',
    answer2: '',
    answer3: '',
    rating: null
  };

  constructor(private candidatService: CandidatService) {}

  ngOnInit(): void {}

  onSubmit(feedbackForm: NgForm) {
    this.candidatService.addFeedBack(this.userId, this.feedback).subscribe({
      next: (response: any) => {
        console.log('Feedback added successfully:', response);
        feedbackForm.reset();
      },
      error: (err: any) => {
        console.error('Error adding feedback:', err);
      }
    });
  }
}
