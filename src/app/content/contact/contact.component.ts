import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormGroup, FormControl, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { ContactService } from '../../services/about.service';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatTooltipModule, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  public contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(100)]),
    phone: new FormControl('', [Validators.pattern("[0-9 ]{9}"), Validators.required, Validators.maxLength(1000)]),
    description: new FormControl('')
  });

  public social = [
      {
        icon: faFacebook,
        name: 'Facebook',
        link: 'https://facebook.com'
      },
      {
        icon: faInstagram,
        name: 'Instagram',
        link: 'https://instagram.com'
      }
    ];

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contactService.setSignal(true);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Tutaj można dodać obsługę wysyłania formularza
      // np. przez HTTP service do backendu lub email service
      console.log('Formularz wysłany:', this.contactForm.value);
      
      // Reset formularza po wysłaniu
      this.contactForm.reset();
      
      // Tutaj można dodać komunikat o pomyślnym wysłaniu
      alert('Wiadomość została wysłana! Dziękuję za kontakt.');
    } else {
      // Pokaż błędy walidacji
      this.contactForm.markAllAsTouched();
      console.log('Formularz zawiera błędy:', this.contactForm.errors);
    }
  }

  openSocialMedia(link: string) {
    window.open(link, '_blank');
  }

  ngOnDestroy(): void {
    this.contactService.setSignal(false);
  }
}
