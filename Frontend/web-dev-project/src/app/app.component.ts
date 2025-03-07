import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { AuthService } from './core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuth = false;
  title = 'web-dev-project';
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authSubscription = this.authService.getAuthStatus().subscribe(
      (status) => {
        this.isAuth = status;
      }
    )
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
