import { Component, OnInit } from '@angular/core';
import { JourneyListComponent } from '../../pages/journey-list/journey-list.component';
import { Router } from '@angular/router';
import { WelcomeComponent } from '../../pages/welcome/welcome.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [JourneyListComponent, WelcomeComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  onLinkClick(link: string) {
    this.router.navigateByUrl(link);
  }

}
