import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private userService:UserService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.username="";
   
    this.password="";
    this.msg="";
    var user:User=JSON.parse(localStorage.getItem("user"));
    if(user){
      console.log(user);
      if(user.type=='regular')
        this.router.navigate(['home']);
      else{
        this.router.navigate(['agentHome']);
      }
    }
  }
  hide=true;
  loading=false;
  username:string;
  password:string;
  msg:string;

  login(){
    this.msg="";
    this.loading = true;
    if(this.username==""||this.password==""){
      this.msg="Required fields must be filled";
      this.snackBar.open(this.msg,'Dismiss');
      
    }
    else{
      this.userService.login(this.username,this.password).subscribe((user:User)=>{
      if(!user){
        this.msg="Invalid data";
        this.snackBar.open(this.msg,'Dismiss');
      }
      else{
        if(user.aproved){
        localStorage.setItem("user",JSON.stringify(user));
        if(user.type=="admin")
          this.router.navigate(["/agentHome"]);
        else if(user.type=="regular")
          this.router.navigate(["/home"]);
        else if(user.type=="agent")
          this.router.navigate(["/agentHome"]);
        }
        else{
          this.msg="You registration is waiting for aproval";
          this.snackBar.open(this.msg,'Dismiss');
        }
      }
    });
    
      
    }
    this.loading=false;
  }
  register(){
    this.router.navigate(["/register"]);

  }
  guest(){
    this.router.navigate(["/home"]);
  }

}
