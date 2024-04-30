
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  constructor(private http: HttpClient) { }

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


getAllFeedBacks(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}/api/feedbacks`);
  }
  deleteFeedBack(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/feedbacks/" + id, { headers: this.createAuthorizationHeader() });
  }


}