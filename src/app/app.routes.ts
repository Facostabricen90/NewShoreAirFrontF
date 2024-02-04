import { Routes } from '@angular/router';
import { JourneyListComponent } from './pages/journey-list/journey-list.component';
import { LayoutComponent } from './pages/layout/layout/layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'search', component: LayoutComponent},
  {path: 'journey-list', component: JourneyListComponent}
];
