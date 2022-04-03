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

  public present: boolean = false;

  // public registerForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required]),
  //   repeatpassword: new FormControl('', [Validators.required]),
  //   mail: new FormControl('', [Validators.required]),
  //   dob: new FormControl('', [Validators.required])
  // }, { validator: this.checkPasswords });

  public registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))]],
    repeatpassword: ['', [Validators.required]],
    mail: ['', [Validators.required]],
    dob: ['', [Validators.required]]
  }, { 
    validator: ConfirmedValidator('password', 'repeatpassword')
  });

  constructor(private api:ApiService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  get f(){
    return this.registerForm.controls;
  }

  submit() {
    console.log(this.registerForm.value.dob);

    this.api.searchUSernamePResence(this.registerForm.value).subscribe(resultSearchArray => {
      if (resultSearchArray.length > 0) {
        this.present = true;
        //this.openSnackBar('Username non disponibile', 'red-snackbar');
        //alert('username già usato');
      } else {
        //alert('username valido');
        const newUSer: User = {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          mail: this.registerForm.value.mail,
          dob: new Date(this.registerForm.value.dob).getTime(),
        }
        this.api.addNewUSer(newUSer).subscribe(user => {
          console.log(user);
          this.openSnackBar('Username registrato con successo', 'green-snackbar');
          this.router.navigate(['login']);
        });
      }
    });
    
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openSnackBar(message: string, colorClass: string) {
    this._snackBar.open(message, 'OK', {
      panelClass: [colorClass]
    });
  }

}
