import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Form } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:Form={
    email:'',
    password:''
  }
  message:string=""
  red1=false;
  red2=false;
  constructor(private router:Router,private http:HttpClient) { }
  checkEmail:string='ucs19209@rmd.ac.in';
  checkPassword:string='123123';

isEmailfilled:boolean=false;
isPassfilled:boolean=false;
  ngOnInit(): void {
  }

  loginUser() {
    this.http.post('http://127.0.0.1:5000/api/signin',{'username':this.form.email,'password':this.form.password}).subscribe((response:any)=>{
      console.log(response.resp)
      this.message=response.resp
      if(this.message=='success'){
        this.router.navigateByUrl('/fileUpload')
      }
  })
  }
}
