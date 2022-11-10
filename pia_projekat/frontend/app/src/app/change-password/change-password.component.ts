import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private  userService : UserService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user){
      this.router.navigate(['']);
    }
  }
  user:User;
  hideOld=true;
  hideNew=true;
  hideRepeat=true;
  msg="";
  oldPassword="";
  newPassword="";
  passwordRepeat="";

  changePassword(){
    
    if(this.oldPassword==""||this.newPassword==""||this.passwordRepeat==""){
      
      this.msg="Required fields must be filled";

    }
    else if(this.oldPassword!=this.user.password){
      this.msg="Wrong old passworrd";
    }
    else if(this.newPassword==this.passwordRepeat){
      this.msg="";
      
      this.userService.changePassword(this.user.username,this.newPassword).subscribe((ret)=>{
          this.userService.logout();
      })
      

    }
    else{
      this.msg="Passwords do not match";
    }
  }
}
