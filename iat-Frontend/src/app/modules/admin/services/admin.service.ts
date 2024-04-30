import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient, private storageService: StorageService) { }

  createAuthorizationHeader(): HttpHeaders {
    const token = this.storageService.getUser().token;
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      console.error('Aucun jeton d\'accès disponible');
      return new HttpHeaders();
    }
  }


  addSujet(sujet: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/sujet/addSujet", sujet, {
      headers: this.createAuthorizationHeader()
    });
  }


  getAllSujets(): Observable<any> {
      return this.http.get (BASIC_URL + "/api/sujet/getAllSujets", { headers: this.createAuthorizationHeader()})
  }

  getSujetById(id: number):Observable<any>{
    return this.http.get (BASIC_URL + "/api/sujet/getSujetById/"+ id, {
      headers: this.createAuthorizationHeader()});

  }

  updateSujet(sujetId: number, sujetDto:any):Observable<any>{
    return this.http.put (BASIC_URL + "/api/sujet/updateSujet/"+sujetId,sujetDto, {
      headers: this.createAuthorizationHeader()});

  }

  deleteSujet(id:number): Observable<any> {
    return this.http.delete (BASIC_URL + "/api/sujet/deleteSujet/"+ id, {
      headers: this.createAuthorizationHeader()
    });
  }


  getAllCandidatures(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}/api/candidature/getAllCandidatures`);
  }

  getCandidaturesBySujet(idSujet: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}/api/candidature/getCandidaturesBySujet/${idSujet}`);
  }

  deleteCandidature(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/candidature/deleteCandidature/" + id, { headers: this.createAuthorizationHeader() });
  }

  downloadCv(idCandidature: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/candidature/downloadCv/" + idCandidature, { headers: this.createAuthorizationHeader(), responseType: 'blob' });
  }
}
