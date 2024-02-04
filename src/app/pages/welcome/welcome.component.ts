import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { JourneyListComponent } from '../journey-list/journey-list.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [SearchComponent, JourneyListComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
