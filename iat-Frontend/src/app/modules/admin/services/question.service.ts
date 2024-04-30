import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class QuestionService {
 private apiUrl = 'http://localhost:8080/api/question';

 constructor(private http: HttpClient) { }

 addQuestionWithResponses(testId: number, question: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${testId}`, question);
 }
}
