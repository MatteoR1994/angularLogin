import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginData = {username: '', password: ''};
  public found:boolean=true;

  public loggedUser:boolean=false

  @Output() logged: EventEmitter<boolean> = new EventEmitter();



  constructor(private api:ApiService, private router: Router) {

   }

  ngOnInit(): void {

    

  }

  
  submit(){

  for (const user of this.api.allUsers) {
    
    if(user.username === this.loginData.username && user.password === this.loginData.password){
      this.router.navigate(['/private']);
      this.loggedUser=true
      this.logged.emit(this.loggedUser)

     break;
    }
  }
 return this.found = false;
  }


}
