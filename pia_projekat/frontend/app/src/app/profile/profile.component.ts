import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router : Router ,private userService:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user){
      this.router.navigate(['']);
    }
    this.editFirstName=this.editLastName=this.editEmail=this.editPicture=this.editCity=false;
    this.firstName=this.user.firstName;
    this.lastName=this.user.lastName;
    this.email=this.user.email;
    this.city=this.user.city;
    var today = new Date();
  }
  

  user:User;
  firstName:string;
  lastName:string;
  password:string;
  email:string;
  city:string;
  pic:File;
  msg:string;
  msgo:string;
  //
  editFirstName:boolean;
  editLastName:boolean;
  editEmail:boolean;
  editCity:boolean;
  editPicture:boolean;
//firstName
  changeFirstName(){
    this.editFirstName=true;
  }
  saveFirstName(){
    if(this.firstName=='' || this.firstName==undefined)
      this.msgo="invalid value";
    else{
    
    this.afterSave("firstName",this.firstName);
    this.editFirstName=false;
  }
}
  cancelFirstName(){
    this.firstName=this.user.firstName;
    this.editFirstName=false;
    this.msgo="";
  }
//lastName
  changeLastName(){
    this.editLastName=true;
  }
  saveLastName(){
    if(this.lastName=='' || this.lastName==undefined)
      this.msgo="invalid value";
    else{
    
    this.afterSave("lastName",this.lastName);
    this.editLastName=false;
    this.msgo="";
    }
  }
  cancelLastName(){
    this.lastName=this.user.lastName;
    this.editLastName=false;
    this.msgo="";
  }
//email
  changeEmail(){
    this.editEmail=true;
  }
  saveEmail(){
    if(this.email=='' || this.email==undefined)
      this.msgo="invalid value";
    else{
      if(!this.checkMailFormat(this.email))
        this.msgo='wrong mail format';
      else{
   
    this.afterSave("email",this.email);
    this.editEmail=false;
  }
}
}
  cancelEmail(){
    this.email=this.user.email;
    this.editEmail=false;
    this.msgo="";
  }
  //city
  changeCity(){
    this.editCity=true;
  }
  saveCity(){
    if(this.city=='' || this.city==undefined)
      this.msgo="invalid value";
    else{
    
    this.afterSave("city",this.city);
    this.editCity=false;
  }
}
  cancelCity(){
    this.city=this.user.city;
    this.editCity=false;
    this.msgo="";
  }

  afterSave(whatToEdit,editValue){
    this.msgo="";
    this.msg='';
    this.userService.editUserData(this.user.username,whatToEdit,editValue).subscribe((resp:any)=>{
      if(resp.msg==1){
        this.userService.getUserByUsername(this.user.username).subscribe((u:User)=>{
          this.user=u;
          localStorage.setItem("user",JSON.stringify(this.user));
        })
        
      }
      else
        {
          this.msgo="mail already exists";
          this.editEmail=true;
        }
    });
    
  }
  checkPictureFormat(pictureName):boolean{
    const regex=/.*\.(gif|jpe?g|bmp|png)$/igm;
    return regex.test(pictureName);
  }
  checkMailFormat(email:string) :boolean{
    const regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  changePassword(){
    this.router.navigate(["changePassword"]);
  }
  changeProfilePicture(event:any){
    this.msg='';
    this.pic=event.target.files[0];
    if(this.checkPictureFormat(this.pic.name)){
    this.userService.changePicture(this.pic,this.user.username).subscribe((o)=>{
      this.userService.getUserByUsername(this.user.username).subscribe((u:User)=>{
        this.user=u;
        localStorage.setItem("user",JSON.stringify(this.user));

    })
    });
  }
  else{
    this.msg="picture is in wrong format";
  }
  }
}
