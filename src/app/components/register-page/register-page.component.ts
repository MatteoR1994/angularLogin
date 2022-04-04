import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/service/api.service';
import { PasswordValidator } from 'src/app/validators/password-validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public showPassword: boolean = false;

  public usernameExists: boolean = false;

  public passwordInvalidMessages: string[] = [];

  public passwordNotSame: boolean = false;

  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,  
      PasswordValidator.hasCapitalChar,
      PasswordValidator.hasLowerChar,
      PasswordValidator.hasNumber,
      PasswordValidator.hasSpecialChars]),
    repeatpassword: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', [Validators.required])
  }, PasswordValidator.mustMatch("password", "repeatpassword"));

  constructor(private api:ApiService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

  }

  register() {
    const newUser: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      mail: this.registerForm.value.mail,
      dob: new Date(this.registerForm.value.dob).getTime()
    };
    this.api.checkUserPresence(this.registerForm.value.username).subscribe({
      next: (user) => {
        if (user) {
          this.usernameExists = true;
        } else {
          this.snackBar.open('Creazione utente in corso...');
          this.api.addNewUSer(newUser).subscribe({
            next: (user) => {
              this.snackBar.dismiss();
              console.log(user);
              if (user) {
                this.router.navigate(['login']);
              }
            },
            error: (error) => {
              this.snackBar.open(error.message, '', {
                duration: 2 * 1000,
              });
            }
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

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
