import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressCard, faBriefcase, faAddressBook, faHome } from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-navigation',
  imports: [FontAwesomeModule, MatTooltipModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  public nav = [
    {
      name: 'Strona główna',
      image: faHome,
      color: '#fff',
      backgroundColor: '#3d8dd1',
      url: '/',
      active: true,
    },
    {
      name: 'O mnie',
      image: faAddressCard,
      color: '#fff',
      backgroundColor: '#3d8dd1',
      url: '/about',
      active: false,
    },
    {
      name: 'Portfolio',
      image: faBriefcase,
      color: '#fff',
      backgroundColor: '#5b3dd1',
      url: '/offer',
      active: false,
    },
    {
      name: 'Kontakt',
      image: faAddressBook,
      color: '#fff',
      backgroundColor: '#d13d6d',
      url: '/contact',
      active: false,
    },
  ];

  public activeRoute = ''

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      const pathName = window.location.pathname;
      this.activeRoute = pathName;
    });
  }

  public goTo(item: any) {
    this.router.navigateByUrl(item.url);
  }
}
