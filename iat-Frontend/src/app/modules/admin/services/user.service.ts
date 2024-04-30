import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getClientBoard(): Observable<any> {
    return this.http.get(API_URL + 'client', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'user/getAll');
  }

  getUser(id: any): Observable<any> {
    return this.http.get<any>(API_URL + 'user/getUser/'+ id);
  }

  updateUser(id: any, user: any): Observable<string> {
    return this.http.put<string>(API_URL + 'user/updateUser/'+ id, user);
  }

  deleteUser(id: any): Observable<string> {
    return this.http.delete<string>(API_URL + 'user/deleteUser/'+ id);
  }

  activateUser(id: any): Observable<string> {
    return this.http.post<string>(API_URL + 'user/activate/' + id, {});
  }

  getRoles(): Observable<any> {
    return this.http.get(API_URL + 'role/getRoles');
  }

  saveImage(file: File, idUser: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(API_URL + "user/saveImage/" + idUser, formData);
  }
}
