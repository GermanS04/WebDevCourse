import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private dummyAccount = {
    email: "dummy@example.com",
    password: "1234"
  };

  constructor(private router: Router){}

  validateCredentials(email: string, password: string): boolean {
    if(email == this.dummyAccount.email){
      return password == this.dummyAccount.password;
    }

    return false;
  }

  login(){
    this.router.navigate(['/home'])
  }

}

