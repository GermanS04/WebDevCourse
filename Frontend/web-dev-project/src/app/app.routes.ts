import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { SigninComponent } from './public/signin/signin/signin.component';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];
