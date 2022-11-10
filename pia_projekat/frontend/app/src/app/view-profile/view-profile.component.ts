import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {



  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (!this.user || this.user.type == 'agent' || this.user.type == 'regular')
      this.router.navigate(['']);
    this.shownUser = JSON.parse(localStorage.getItem("shownUser"));
    if (!this.shownUser)
      this.shownUser = this.user;
    this.editFirstName = this.editLastName = this.editEmail = this.editPicture = this.editCity = false;
    this.firstName = this.shownUser.firstName;
    this.lastName = this.shownUser.lastName;
    this.email = this.shownUser.email;
    this.city = this.shownUser.city;
    var today = new Date();
  }

  shownUser: User;
  user: User;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  city: string;
  pic: File;
  msg: string;
  msgo: string;
  //
  editFirstName: boolean;
  editLastName: boolean;
  editEmail: boolean;
  editCity: boolean;
  editPicture: boolean;
  //firstName
  changeFirstName() {
    this.editFirstName = true;
  }
  saveFirstName() {
    if (this.firstName == '' || this.firstName == undefined)
      this.msgo = "invalid value";
    else {

      this.afterSave("firstName", this.firstName);
      this.editFirstName = false;
    }
  }
  cancelFirstName() {
    this.firstName = this.shownUser.firstName;
    this.editFirstName = false;
    this.msgo = "";
  }
  //lastName
  changeLastName() {
    this.editLastName = true;
  }
  saveLastName() {
    if (this.lastName == '' || this.lastName == undefined)
      this.msgo = "invalid value";
    else {

      this.afterSave("lastName", this.lastName);
      this.editLastName = false;
      this.msgo = "";
    }
  }
  cancelLastName() {
    this.lastName = this.shownUser.lastName;
    this.editLastName = false;
    this.msgo = "";
  }
  //email
  changeEmail() {
    this.editEmail = true;
  }
  saveEmail() {
    if (this.email == '' || this.email == undefined)
      this.msgo = "invalid value";
    else {
      if (!this.checkMailFormat(this.email))
        this.msgo = 'wrong mail format';
      else {

        this.afterSave("email", this.email);
        this.editEmail = false;
      }
    }
  }
  cancelEmail() {
    this.email = this.shownUser.email;
    this.editEmail = false;
    this.msgo = "";
  }
  //city
  changeCity() {
    this.editCity = true;
  }
  saveCity() {
    if (this.city == '' || this.city == undefined)
      this.msgo = "invalid value";
    else {

      this.afterSave("city", this.city);
      this.editCity = false;
    }
  }
  cancelCity() {
    this.city = this.shownUser.city;
    this.editCity = false;
    this.msgo = "";
  }

  afterSave(whatToEdit, editValue) {
    this.msgo = "";
    this.userService.editUserData(this.shownUser.username, whatToEdit, editValue).subscribe((resp: any) => {
      if (resp.msg == 1) {
        this.userService.getUserByUsername(this.shownUser.username).subscribe((u: User) => {
          this.shownUser = u;
          localStorage.setItem("shownUser", JSON.stringify(this.shownUser));
        })

      }
      else {
        this.msgo = "mail already exists";
        this.editEmail = true;
      }
    });

  }
  checkPictureFormat(pictureName): boolean {
    const regex = /.*\.(gif|jpe?g|bmp|png)$/igm;
    return regex.test(pictureName);
  }
  checkMailFormat(email: string): boolean {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  changePassword() {
    this.router.navigate(["changePassword"]);
  }
  decline() {
    this.userService.declineUser(this.shownUser.username).subscribe(msg => {
      localStorage.removeItem("shownUser");
      this.router.navigate(["showAllUsers"]);
    })
  }
  aprove() {
    this.userService.aproveUser(this.shownUser.username).subscribe(msg => {
      this.userService.getUserByUsername(this.shownUser.username).subscribe((u: User) => {
        console.log(u);
        this.shownUser = u;
      })
    })
  }
  changeProfilePicture(event: any) {
    this.pic = event.target.files[0];
    if (this.checkPictureFormat(this.pic.name)) {
      this.userService.changePicture(this.pic, this.shownUser.username).subscribe((o) => {
        this.userService.getUserByUsername(this.shownUser.username).subscribe((u: User) => {
          this.shownUser = u;
          localStorage.setItem("shownUser", JSON.stringify(this.shownUser));

        })
      });
    }
    else {
      this.msg = "picture is in wrong format";
    }
  }
  delete(){
    this.userService.declineUser(this.shownUser.username).subscribe(msg => {
      localStorage.removeItem("shownUser");
      this.router.navigate(["showAllUsers"]);
    })
  }

 
}



