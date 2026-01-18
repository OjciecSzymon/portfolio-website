import { Component } from '@angular/core';
import { faCheck, faCode, faPalette, faDatabase, faCogs, faRocket, faProjectDiagram, faUsers, faChartLine, faBug } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faJs, faHtml5, faCss3Alt, faGit, faDocker as faDockerBrand, faWordpress } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-offer',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent {
  public checkIcon = faCheck;
  
  public skills = [
    { name: 'Angular', level: 95, icon: faAngular },
    { name: 'TypeScript', level: 90, icon: faCode },
    { name: 'JavaScript', level: 88, icon: faJs },
    { name: 'jQuery', level: 90, icon: faJs },
    { name: 'HTML5', level: 92, icon: faHtml5 },
    { name: 'CSS3/SCSS', level: 85, icon: faCss3Alt },
    { name: 'Material Design', level: 80, icon: faPalette },
    { name: 'RxJS', level: 75, icon: faDatabase },
    { name: 'Git', level: 85, icon: faGit },
    { name: 'WordPress', level: 85, icon: faWordpress }
  ];

  public tools = [
    { name: 'Git & GitHub', icon: faCogs, category: 'Version Control' },
    { name: 'Docker', icon: faCogs, category: 'DevOps' },
    { name: 'Agile/Scrum', icon: faUsers, category: 'Methodology' },
    { name: 'CI/CD', icon: faRocket, category: 'DevOps' },
    { name: 'RESTful APIs', icon: faProjectDiagram, category: 'Backend' },
    { name: 'Unit Testing', icon: faBug, category: 'Testing' },
    { name: 'Performance', icon: faChartLine, category: 'Optimization' },
    { name: 'Code Review', icon: faCogs, category: 'Quality' }
  ];

  constructor(private router: Router) {}

  public goToContact() {
    this.router.navigateByUrl('/contact');
  }
}
