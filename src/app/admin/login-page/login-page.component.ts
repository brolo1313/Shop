import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  constructor() { 
    // console.log(this.form.get('password')); 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]), 
    });

      console.log(this.form.controls['password']);
  }

  submit(){

  }

}
