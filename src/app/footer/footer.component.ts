import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../services/about.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public isContactPage: boolean | null = false;

  constructor(private contactSevice: ContactService) {
    this.subscription = this.contactSevice.signal$.subscribe((value: boolean | null) => {
      this.isContactPage = value;
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
