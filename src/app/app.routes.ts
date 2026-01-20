import { Routes } from '@angular/router';
import { AboutComponent } from './content/about/about.component';
import { OfferComponent } from './content/offer/offer.component';
import { ContactComponent } from './content/contact/contact.component';
import { HomeComponent } from './content/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'o-mnie', component: AboutComponent },
    { path: 'skile', component: OfferComponent },
    { path: 'kontakt', component: ContactComponent },
    { path: '**', redirectTo: '/' }
];
