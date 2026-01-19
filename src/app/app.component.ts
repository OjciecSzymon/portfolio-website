import { Component, OnInit } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { Router } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, ContentComponent, NavigationComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public backgroundConfig: {url: string, size: string} | undefined = undefined;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (window.location.pathname === "/") {
        this.backgroundConfig = {
          url: 'url(../../assets/stronka-4.jpg)',
          size: '80vw',
        };
      } else {
        this.backgroundConfig = undefined;
      }
    });
  }
}
