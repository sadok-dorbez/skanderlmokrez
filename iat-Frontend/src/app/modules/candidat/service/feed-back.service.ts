import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http:HttpClient) { }

  addFeedBack(userId: number, feedback: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/feedbacks/" + userId , feedback, { headers: this.createAuthorizationHeader()});
  }

  createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      // Gérer le cas où aucun jeton n'est disponible
      // Par exemple, rediriger l'utilisateur vers la page de connexion
      console.error('Aucun jeton d\'accès disponible');
      return new HttpHeaders();
    }
  }
//   getAllFeedBacks(): Observable<any> {
//     return this.http.get (BASIC_URL + "/api/candidat/getAllSujet", { headers: this.createAuthorizationHeader()})
//   }

//   getSujetById(id: number):Observable<any>{
//     return this.http.get (BASIC_URL + "/api/admin/getSujetById/"+ id, {
//       headers: this.createAuthorizationHeader()});

//   }

//   getCandidatureById(id: number): Observable<any> {
//     return this.http.get(BASIC_URL + "/api/candidat/getCandidatureById/" + id, { headers: this.createAuthorizationHeader() });
//   }
 
}
