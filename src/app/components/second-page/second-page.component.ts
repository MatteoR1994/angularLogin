import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  public loggedUser?: User;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loggedUser = this.api.user;
  }

}
