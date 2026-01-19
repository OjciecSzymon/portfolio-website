import { Component, OnDestroy } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormGroup, FormControl, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { ContactService } from '../../services/about.service';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatTooltipModule, FontAwesomeModule, MatFormFieldModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnDestroy {
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

  constructor(
    private contactService: ContactService,
    private notification: NotificationService
  ) {}

  onSubmit() {
    if (this.contactForm.valid) {
      // Tutaj można dodać obsługę wysyłania formularza
      // np. przez HTTP service do backendu lub email service
      
      // Reset formularza po wysłaniu
      this.contactForm.reset();
      this.notification.success('Wiadomość została wysłana');
    } else {
      this.contactForm.markAllAsTouched();
      this.notification.error('Popraw zaznaczone pola');
    }
  }

  ngOnDestroy(): void {
    this.contactService.setSignal(false);
  }
}
