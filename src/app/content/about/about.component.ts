import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLaptop, faPalette, faFile, faWaveSquare, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  public faLaptop = faLaptop;
  public faPalette = faPalette;
  public faFile = faFile;
  public faWaveSquare = faWaveSquare;
  public faTruckFast = faTruckFast;

  constructor(private router: Router) {}

  goToOffer() {
    window.open('https://kadrikod.pl/portfolio/', '_blank');
  }
}
