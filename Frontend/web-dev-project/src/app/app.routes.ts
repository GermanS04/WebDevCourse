import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { SigninComponent } from './features/login/signin/signin.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignupComponent } from './features/login/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] }
];
