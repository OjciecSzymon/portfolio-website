import { Routes } from '@angular/router';
import { AboutComponent } from './content/about/about.component';
import { OfferComponent } from './content/offer/offer.component';
import { ContactComponent } from './content/contact/contact.component';
import { HomeComponent } from './content/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'offer', component: OfferComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '/home' }
];
