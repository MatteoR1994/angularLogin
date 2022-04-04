import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ConfirmedValidator } from 'src/app/onfirmed.validator';
import { ApiService } from 'src/app/service/api.service';

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
    password: new FormControl('', [Validators.required]),
    repeatpassword: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', [Validators.required])
  });

  // public registerForm = this.formBuilder.group({
  //   username: ['', [Validators.required]],
  //   password: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))]],
  //   repeatpassword: ['', [Validators.required]],
  //   mail: ['', [Validators.required]],
  //   dob: ['', [Validators.required]]
  // }, { 
  //   validator: ConfirmedValidator('password', 'repeatpassword')
  // });

  constructor(private api:ApiService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

  }

  register() {
    // const regularPass = this.checkPasswordComposition();
    //       console.log(regularPass.message.length);
    //       if (regularPass.message.length === 0) {
            
    //       } else {
    //         this.passwordInvalidMessages = regularPass.message;
    //         console.log(this.passwordInvalidMessages);
    //       }
    const newUser: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      mail: this.registerForm.value.mail,
      dob: new Date(this.registerForm.value.dob).getTime()
    };
    this.api.login(this.registerForm.value.username, this.registerForm.value.password).subscribe({
      next: (user) => {
        if (user) {
          this.usernameExists = true;
        } else {
          const regularPassword = this.checkPasswordComposition();
          console.log(regularPassword.message.length);
          if (regularPassword.message.length === 0) {
            if (!this.checkPasswordConfirm(this.registerForm.value.password, this.registerForm.value.repeatpassword)) {
              this.passwordNotSame = true;
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
          } else {
            this.passwordInvalidMessages = regularPassword.message;
            console.log(this.passwordInvalidMessages);
          }
          // this.snackBar.open('Creazione utente in corso...');
          // this.api.addNewUSer(newUser).subscribe({
          //   next: (user) => {
          //     this.snackBar.dismiss();
          //     console.log(user);
          //     if (user) {
          //       this.router.navigate(['login']);
          //     }
          //   },
          //   error: (error) => {
          //     this.snackBar.open(error.message, '', {
          //       duration: 2 * 1000,
          //     });
          //   }
          // });
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

  public checkPasswordComposition() {
    const newPassword = this.registerForm.value.password;
    const checkResult:any = { regular: false, message: [] };
    const hasCapital = /[A-Z]/.test(newPassword) ? checkResult.regular = true : checkResult.message.push('La password non ha lettere maiuscole');
    const hasLower = /[a-z]/.test(newPassword) ? checkResult.regular = true : checkResult.message.push('La password non ha lettere minuscole');
    const hasNumber = /[0-9]/.test(newPassword) ? checkResult.regular = true : checkResult.message.push('La password non ha numeri');
    const hasSpecial = /[!@#\$%\^&\*]/.test(newPassword) ? checkResult.regular = true : checkResult.message.push('La password non ha caratteri speciali');
    const isMoreThen = newPassword.length < 8 ? checkResult.regular = checkResult.message.push('La password è più corta di 8 caratteri') : true;
    return checkResult;
  }

  public checkPasswordConfirm(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

}
