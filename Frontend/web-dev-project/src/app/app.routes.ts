import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { SigninComponent } from './public/signin/signin/signin.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] }
];
