import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie'
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string;

  constructor(private http: HttpClient) {
    this.token = Cookies.get('session');
  }

  isLoggedIn(): boolean {
    if(this.token) return true;
    return false;
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    Cookies.set('session', token);
    this.token = token;
  }

  getCurrentUserObserver(){
    return this.http.get<User>(environment.apiURL + '/me')
  }

  logout() {
    Cookies.remove('session');
    this.token = null;
  }
}
