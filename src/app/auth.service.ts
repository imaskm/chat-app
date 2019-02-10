import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as moment from 'moment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = new Subject<any>();
  constructor(private http: HttpClient) {
    
  }

  login(obj) {
    const data = JSON.stringify(obj)
    return this.http.post("http://127.0.0.1:8000/api/user/login", data);
  }

  setSession(authResult) {
      this.loggedInStatus.next({ loggedIn: true });

      const expiresAt = moment().add(authResult.expiresIn,'second');
      localStorage.setItem('id_token', authResult.account.token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      this.loggedInStatus.next({ loggedIn: false });
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  getLoggedInStatus(): Observable<any> {
    return this.loggedInStatus.asObservable();
  }

}
