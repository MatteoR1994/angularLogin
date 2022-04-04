import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public logged: boolean = true;

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private api: ApiService, private router: Router, private snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {

  }
  
  login(){
    // this.api.checkUserLogin(this.loginForm.value).subscribe({
    //   next: res => {
    //     const user = res.find((a: any) => {
    //       return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
    //     });
    //     if (user) {
    //       //alert('Login Succesful');
    //       this.loginForm.reset();
    //       this.api.loginState$.next(true);
    //       this.router.navigate(['private']);
    //     } else {
    //       //alert("user not found");
    //       this.logged = false;
    //     }
    //   },
    //   error: () => {
    //     alert("Something went wrong")
    //   }
    // });
    this.snackBar.open('Loading...');
    this.api.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (user) => {
        this.snackBar.dismiss();
        if (user) {
          this.router.navigate(['private']);
        } else {
          this.snackBar.open('Utente non trovato, controlla i dati di accesso.', '', {
            duration: 2 * 1000,
          });
        }
      },
      error: (error) => {
        this.snackBar.open(error.message, '', {
          duration: 2 * 1000,
        });
      }
    });
  }

}
