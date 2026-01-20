import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { SKILLS_CONST, TOOLS_CONST } from './offer.consts';

@Component({
  selector: 'app-offer',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent {
  public checkIcon = faCheck;
  public skills = SKILLS_CONST;
  public tools = TOOLS_CONST;

  constructor(private router: Router) {}

  public goToContact() {
    this.router.navigateByUrl('/kontakt');
  }
}
