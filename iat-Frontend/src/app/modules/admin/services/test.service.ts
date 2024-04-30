import { Test } from '../../models/testModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
 providedIn: 'root'
})
export class TestService {

 private baseUrl = "http://localhost:8080/api/test";

 constructor(private http: HttpClient, private router: Router) { }
 addTestToSujet(data: Test, sujetId: any): Observable<Test> {
    return this.http.post<Test>(`${this.baseUrl}/${sujetId}`, data);
 }

 getAllTest(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseUrl}`);
 }

 getTestsBySujetId(sujetId: any): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseUrl}/getSujet/${sujetId}`);
 }

 getTestById(testId: any): Observable<Test> {
    return this.http.get<Test>(`${this.baseUrl}/${testId}`);
 }

 updateTest(testId: any, data: Test): Observable<Test> {
    return this.http.put<Test>(`${this.baseUrl}/${testId}`, data);
 }

 public deleteTest(testId: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${testId}`);
 }

 navigateToQuestionForm(testId: number): void {
   this.router.navigate(['/question', { testId: testId }]);
  }

//   getTestsByPostId(postId: number): Observable<Test[]> {
//    return this.http.get<Test[]>(`${this.baseUrl}/getPost/${postId}`);
//  }
}
