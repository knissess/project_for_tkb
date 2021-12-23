import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public aboutServiceFlag = false;

  public contacts = [
    {
      phone: '+7 800 100-32-00',
      description: 'для бесплатных звонков на территории России',
    },
    {
      phone: '+7 495 777-41-50',
      description: 'для звонков из любой точки мира (по тарифам вашего оператора связи)',
    },
  ]

  constructor(
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.aboutServiceFlag = window.location.pathname.includes('about') ? false : true;
  }

  public changeNavigation(): void {
    this.aboutServiceFlag ? this.router.navigateByUrl('/about') : this.router.navigateByUrl('/check');
  }

}
