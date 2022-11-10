import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
  }
  user : User;

  login(){
    this.router.navigate([""]);
  }
  logout(){
    localStorage.clear();
    this.userService.logout();
    this.router.navigate([""]);
    
  }
  home(){
    
    if(this.user.type=="regular")
      this.router.navigate(["home"]);
    else{
      if(this.user.type=='admin' || this.user.type=='agent')
        this.router.navigate(["agentHome"]);
      
    }
  }
  profile(){
    this.router.navigate(["profile"]);
  }
  addRealEstate(){
    this.router.navigate(["addRealEstate"]);
  }
  addManyRealEstates(){
    this.router.navigate(['addMultipleRealEstates']);
  }
  showYourRealEstates(){
    this.router.navigate(["showYourRealEstates"]);
  }
  showAllRealEstates(){
    this.router.navigate(["showAllRealEstates"]);
  }
  showPendingRealEstates(){
    this.router.navigate(["showPendingRealEstates"]);
  }
  inbox(){
    this.router.navigate(['inbox']);
  }
  showDoneDeals(){
    this.router.navigate(['showConfirmedBuys']);
  }
  showPendingDeals(){
    this.router.navigate(['showPendingBuys']);
  }
  showAllUsers(){
    this.router.navigate(['showAllUsers']);
  }
  showUsersWaitingForAproval(){
    this.router.navigate(['showUsersWaitingForAproval']);
  };
  addUser(){
    this.router.navigate(['addUser']);
  }
}
