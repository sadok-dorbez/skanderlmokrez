import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveUser(user: any): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clean(): void {
    window.localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return this.getUser();
  }

  isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.roles.includes('ROLE_ADMIN');
  }

  isCandidatLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.roles.includes('ROLE_CANDIDAT');
  }

}
