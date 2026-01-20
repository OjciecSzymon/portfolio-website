import { faCode, faPalette, faDatabase, faCogs, faRocket, faProjectDiagram, faUsers, faChartLine, faBug, faICursor } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faJs, faHtml5, faCss3Alt, faDocker as faDockerBrand, faWordpress, faFigma, faReact } from '@fortawesome/free-brands-svg-icons';

export const SKILLS_CONST =  [
    { name: 'Angular', level: 95, icon: faAngular },
    { name: 'TypeScript', level: 90, icon: faCode },
    { name: 'JavaScript', level: 88, icon: faJs },
    { name: 'jQuery', level: 90, icon: faJs },
    { name: 'HTML5', level: 92, icon: faHtml5 },
    { name: 'CSS3/SCSS', level: 85, icon: faCss3Alt },
    { name: 'Material Design', level: 80, icon: faPalette },
    { name: 'RxJS', level: 75, icon: faDatabase },
    { name: 'WordPress', level: 85, icon: faWordpress },
    { name: 'React', level: 20, icon: faReact },
];

export const TOOLS_CONST = [
    { name: 'Git & GitHub', icon: faCogs, category: 'Version Control' },
    { name: 'Agile/Scrum', icon: faUsers, category: 'Methodology' },
    { name: 'CI/CD', icon: faRocket, category: 'DevOps' },
    { name: 'RESTful APIs', icon: faProjectDiagram, category: 'Backend' },
    { name: 'Unit Testing', icon: faBug, category: 'Testing' },
    { name: 'Performance', icon: faChartLine, category: 'Optimization' },
    { name: 'Code Review', icon: faCogs, category: 'Quality' },
    { name: 'VSCode', icon: faCode, category: 'IDE' },
    { name: 'Cursor', icon: faICursor, category: 'IDE' },
    { name: 'Figma', icon: faFigma, category: 'Design' },
];

