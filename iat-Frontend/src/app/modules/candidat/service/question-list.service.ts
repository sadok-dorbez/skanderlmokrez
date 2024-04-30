import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Test } from '../../models/testModel';

@Injectable({
 providedIn: 'root'
})
export class QuestionService {
 private apiUrl = 'http://localhost:8080/api/question/getTest';
 private apiUrl2 = 'http://localhost:8080/api/responseUser';
 private apiUrl3 = 'http://localhost:8080/api/responseUser/countCorrectByTestId';
 private apiUrl4 = 'http://localhost:8080/api/question/countByTestId';
 private apiUrl5 = 'http://localhost:8080/api/test';

 constructor(private http: HttpClient) { }


 getTestById(testId: number): Observable<Test> {

  return this.http.get<Test>(`${this.apiUrl}/${testId}`);
}

 getAllQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl5);
 }

 getQuestionsByTestId(testId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${testId}`);
 }

 saveResponseUser(questionId: number,userId: number, responseText: string): Observable<any> {
   const responseUser = {
     questionId: questionId,
     userId: userId,
     responseText: responseText
   };
   return this.http.post<any>(`${this.apiUrl2}/${questionId}/${userId}`, responseUser);
}


countCorrectResponseUsersByTestId(testId: number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl3}/${testId}`);
}

countQuestionsByTestId(testId: number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl4}/${testId}`);
}

}
