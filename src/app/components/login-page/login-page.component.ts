import { Component, OnInit } from '@angular/core';
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

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private api: ApiService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }
  
  login(){
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
