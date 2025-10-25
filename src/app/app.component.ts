import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { Router } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, ContentComponent, NavigationComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'so';
  public backgroundConfig: {url: string, size: string} | undefined = undefined;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      console.log(val);
      switch (val.url) {
        case '/home':
          this.backgroundConfig = {
            url: 'url(../../assets/stronka-4.jpg)',
            size: '80vw',
          };
          break;
        case '/contact':
          this.backgroundConfig = {
            url: 'url(../../assets/stronka.jpg)',
            size: 'contain',
          };
          break;
        default:
          this.backgroundConfig = undefined;
      }
    });
  }
}
