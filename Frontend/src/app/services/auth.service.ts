import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}

  register(user: any) {
    return this.http.post('http://localhost:3030/auth/register', user);
  }

  login(user: any) {
    return this.http.post('http://localhost:3030/auth/login', user);
  }
}
