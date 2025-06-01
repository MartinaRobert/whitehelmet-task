import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  public readonly isLoggedIn$ = this._isLoggedIn.asObservable();
  private loginUrl = 'https://www.melivecode.com/api/login';
  constructor(private http: HttpClient ) { }

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap((res) => {
        sessionStorage.setItem('token', res.accessToken)
        this._isLoggedIn.next(true);
      })
    );
  }
  logout() {
    sessionStorage.removeItem('token');
    this._isLoggedIn.next(false);
    
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }
}
