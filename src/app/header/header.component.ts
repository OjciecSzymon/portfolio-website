import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactService } from '../services/about.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatTooltipModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
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
  private subscription: Subscription;
  public isContactPage: boolean | null = false;

  constructor(private contactSevice: ContactService) {
    this.subscription = this.contactSevice.signal$.subscribe((value: boolean | null) => {
      this.isContactPage = value;
    });
  }

  ngOnInit(): void {
    
  }

  openSocialMedia(link: string) {
    window.open(link, '_blank');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
