import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/layout/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
  },
  {
    path: 'journey-list',
    loadComponent: () =>
      import('./pages/journey-list/journey-list.component').then(
        (c) => c.JourneyListComponent
      ),
  },
];
