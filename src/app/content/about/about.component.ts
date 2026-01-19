import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLaptop, faPalette, faFile, faWaveSquare, faTruckFast } from '@fortawesome/free-solid-svg-icons';

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

  public birthDate = new Date('1995-11-25');
  public age = Math.floor((new Date().getTime() - this.birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

  constructor() {}

  goToOffer() {
    window.open('https://kadrikod.pl/portfolio/', '_blank');
  }
}
