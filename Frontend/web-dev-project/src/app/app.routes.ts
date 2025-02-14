import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];
