import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string): boolean {
    alert(`username: ${username}`);
    localStorage.setItem('user', JSON.stringify({ username }));
    return true;
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
