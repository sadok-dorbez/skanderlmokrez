import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: any){
    return this.http.post(BASE_URL + "/api/auth/signup", signupRequest);
  }

  login(signupRequest: any){
    return this.http.post(BASE_URL + "/api/auth/signin", signupRequest);
  }


}
