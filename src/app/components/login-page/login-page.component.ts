import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // public loginData = { username: '', password: '' };
  // public found: boolean = true;
  // public loggedUser: boolean = false
  // @Output() logged: EventEmitter<boolean> = new EventEmitter();

  public logged: boolean = true;

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {

  }

  get f(){
    return this.loginForm.controls;
  }
  
  submit(){
    this.api.checkUserLogin(this.loginForm.value).subscribe({
      next: res => {
        const user = res.find((a: any) => {
          return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
        });
        if (user) {
          //alert('Login Succesful');
          this.loginForm.reset();
          this.api.loginState$.next(true);
          this.router.navigate(['private']);
        } else {
          //alert("user not found");
          this.logged = false;
        }
      },
      error: () => {
        alert("Something went wrong")
      }
    });
  }

  // submit() {
  //   for (const user of this.api.allUsers) {
  //     if (user.username === this.loginData.username && user.password === this.loginData.password) {
  //       this.router.navigate(['/private']);
  //       this.loggedUser = true
  //       this.logged.emit(this.loggedUser)
  //       break;
  //     }
  //   }
  //   return this.found = false;
  // }

}
