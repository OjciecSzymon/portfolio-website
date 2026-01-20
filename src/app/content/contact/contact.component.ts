import { Component, OnDestroy } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormGroup, FormControl, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { ContactService } from '../../services/about.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotificationService } from '../../services/notification.service';
import { ContactFormService } from '../../services/contact-form.service';
import { SOCIAL_CONST } from './contact.consts';


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
    phone: new FormControl('', [Validators.pattern("[0-9 ]{9}"), Validators.maxLength(1000)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    website: new FormControl('')
  });

  public social = SOCIAL_CONST;

  constructor(
    private contactService: ContactService,
    private notification: NotificationService,
    private contactFormService: ContactFormService
  ) {}

  onSubmit() {
    if (this.contactForm.valid) {
      const payload = this.contactForm.getRawValue();

      this.contactForm.disable();
      this.contactFormService.send({
        firstName: payload.firstName ?? '',
        lastName: payload.lastName ?? '',
        email: payload.email ?? '',
        phone: payload.phone ?? '',
        description: payload.description ?? '',
        website: payload.website ?? ''
      }).subscribe({
        next: (res) => {
          if (res?.ok) {
            this.contactForm.reset();
            this.notification.success('Wiadomość została wysłana');
          } else {
            this.notification.error(res?.error ?? 'Nie udało się wysłać wiadomości');
          }
          this.contactForm.enable();
        },
        error: () => {
          this.notification.error('Nie udało się wysłać wiadomości');
          this.contactForm.enable();
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      this.notification.error('Popraw zaznaczone pola');
    }
  }

  ngOnDestroy(): void {
    this.contactService.setSignal(false);
  }
}
