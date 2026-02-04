import { Routes } from '@angular/router';
import { AboutComponent } from './content/about/about.component';
import { OfferComponent } from './content/offer/offer.component';
import { ContactComponent } from './content/contact/contact.component';
import { HomeComponent } from './content/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'Szymon Ostrowski – Frontend Developer & Angular Expert',
            description: 'Strona główna portfolio Szymona Ostrowskiego. Frontend Developer z 10-letnim doświadczeniem. Angular, TypeScript, Material Design. Białystok, Polska.'
        }
    },
    {
        path: 'o-mnie',
        component: AboutComponent,
        data: {
            title: 'O mnie',
            description: 'Szymon Ostrowski – Frontend Developer z pasją do nowoczesnych technologii. 10 lat doświadczenia, Angular, TypeScript, certyfikat Angular in Space.'
        }
    },
    {
        path: 'skile',
        component: OfferComponent,
        data: {
            title: 'Portfolio i umiejętności',
            description: 'Umiejętności techniczne i narzędzia: Angular, TypeScript, RxJS, Material Design, Agile, DevOps. Portfolio Frontend Developera.'
        }
    },
    {
        path: 'kontakt',
        component: ContactComponent,
        data: {
            title: 'Kontakt',
            description: 'Skontaktuj się z Szymonem Ostrowskim. Frontend Developer do wynajęcia. Białystok i cała Polska. Email, formularz kontaktowy.'
        }
    },
    { path: '**', redirectTo: '/' }
];
