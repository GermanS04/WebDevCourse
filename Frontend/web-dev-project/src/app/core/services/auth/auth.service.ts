import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private dummyAccount = {
    email: "dummy@example.com",
    password: "1234"
  };

  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object){}

  validateCredentials(email: string, password: string): boolean {
    if(email == this.dummyAccount.email){
      return password == this.dummyAccount.password;
    }

    return false;
  }

  login(){
    localStorage.setItem('fakeToken', 'dummy-token-123');
    this.authStatus.next(true);
    this.router.navigate(['/home'])
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('fakeToken');
    }

    return false;
  }

  logout() {
    localStorage.removeItem('fakeToken');
    this.authStatus.next(false);
    this.router.navigate(['/signin']);
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }
}

