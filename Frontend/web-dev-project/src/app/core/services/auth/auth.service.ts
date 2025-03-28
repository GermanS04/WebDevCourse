import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiSignIn;
  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    this.updateAuthStatus();
  }

  private updateAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = !!localStorage.getItem('token');
      this.authStatus.next(isLoggedIn);
    }
  }

  validateCredentials(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeAuthData(response.token);
          this.authStatus.next(true);
          this.router.navigate(['/home']);
        }
      })
    );
  }

  storeAuthData(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }

    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.authStatus.next(false);
    this.router.navigate(['/signin']);
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
