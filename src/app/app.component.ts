import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { JourneyListComponent } from './pages/journey-list/journey-list.component';
import { SearchComponent } from './pages/search/search.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, NavComponent, JourneyListComponent, SearchComponent]
})
export class AppComponent {
  title = 'NewShoreAirFrontF';
}
