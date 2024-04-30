import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

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

  getAllSujets(): Observable<any> {
    return this.http.get (BASIC_URL + "/api/sujet/getAllSujets", { headers: this.createAuthorizationHeader()})
  }

  getSujetById(id: number):Observable<any>{
    return this.http.get (BASIC_URL + "/api/sujet/getSujetById/"+ id, {
      headers: this.createAuthorizationHeader()});

  }

  getCandidatureById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/candidature/getCandidatureById/" + id, { headers: this.createAuthorizationHeader() });
  }

  addCandidature(idUser: number, idSujet: number, candidature: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/candidature/addCandidature/" + idUser + "/" + idSujet, candidature, { headers: this.createAuthorizationHeader() });
  }

  updateCandidature(id: number, candidature: any): Observable<any> {
    return this.http.put(BASIC_URL + "/api/candidature/updateCandidature/" + id, candidature, { headers: this.createAuthorizationHeader() });
  }

  deleteCandidature(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/candidature/deleteCandidature/" + id, { headers: this.createAuthorizationHeader() });
  }

  getCandidaturesByUser(idUser: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/candidature/getCandidaturesByUser/" + idUser, { headers: this.createAuthorizationHeader() });
  }

  uploadCv(idCandidature: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(BASIC_URL + "/api/candidature/uploadCv/" + idCandidature, formData, { headers: this.createAuthorizationHeader() });
  }

  downloadCv(idCandidature: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/candidature/downloadCv/" + idCandidature, { headers: this.createAuthorizationHeader(), responseType: 'blob' });
  }
}
