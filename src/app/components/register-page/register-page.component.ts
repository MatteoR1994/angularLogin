import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/onfirmed.validator';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public showPassword: boolean = false;

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

  constructor(private api:ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get f(){
    return this.registerForm.controls;
  }

  submit() {

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
