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

  public logged: boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.loginState$.subscribe(state => this.logged = state);
  }

  logout() {
    this.api.loginState$.next(false);
    this.router.navigate(['login']);
  }
}
