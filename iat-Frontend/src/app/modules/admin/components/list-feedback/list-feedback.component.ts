import { Component, OnInit } from '@angular/core';
import {FeedBackService} from "../../services/feedback.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit{

  feedbacks: any= [];
  constructor(private feedBackService: FeedBackService, private router : Router) { }

  ngOnInit(): void {
    this.getAllFeedBacks()
  }

  getAllFeedBacks(){
    this.feedBackService.getAllFeedBacks().subscribe({
      next: (feedbacks: any[]) => {
        this.feedbacks = feedbacks;
        console.log('Feedbackss fetched successfully!')
      },
      error: (err: any) => {
        console.error('Error fetching feedbacks:', err);
      }
    });
  }

  deleteFeedBack(id: any): void {
    if (window.confirm('Are you sure you want to delete this FeedBack?')) {
      this.feedBackService.deleteFeedBack(id).subscribe(
        () => {
          console.log(`FeedBack with ID ${id} deleted successfully.`);
          this.getAllFeedBacks();
        },
        (error: any) => {
          console.error(`Error deleting feedback with ID ${id}:`, error);
        }
      );
    }
  }


}
