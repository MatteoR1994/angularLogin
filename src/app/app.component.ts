import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularLogin';

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.api.logout();
    this.router.navigate(['login']);
  }
}
