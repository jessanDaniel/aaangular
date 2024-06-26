import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string=''
  password:string=''
  message:string=''
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  signup(){
    this.http.post('http://localhost:5000/create-user',{'email':this.email,'password':this.password}).subscribe((response:any)=>{
      this.message=response.resp
      if(this.message=="SignUp Successful"){
        this.router.navigateByUrl('/login');
      }
  });
  }
}