import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressCard, faBriefcase, faAddressBook, faHome } from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-navigation',
  imports: [FontAwesomeModule, MatTooltipModule, RouterLink, RouterLinkActive],
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
      url: '/o-mnie',
      active: false,
    },
    {
      name: 'Portfolio',
      image: faBriefcase,
      color: '#fff',
      backgroundColor: '#5b3dd1',
      url: '/skile',
      active: false,
    },
    {
      name: 'Kontakt',
      image: faAddressBook,
      color: '#fff',
      backgroundColor: '#d13d6d',
      url: '/kontakt',
      active: false,
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
