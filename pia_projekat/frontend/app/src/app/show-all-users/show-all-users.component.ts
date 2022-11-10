import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {

  constructor(private router : Router, private reService:RealEstateService,private userService:UserService) { }

  ngOnInit(): void {
    
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user || this.user.type=='regular' || this.user.type=='agent')
      this.router.navigate(['']);
    this.userService.getAllUsers().subscribe((u:User[])=>{
      this.users=u;
      this.usersOnPage=this.users.slice(0,this.pageSize);
    });
   
  }
  user:User;
  users:User[];
  usersOnPage:User[];
  startIndex:number;
  endIndex:number;
  pageSize:number =8;



  pageEvent(event: PageEvent){
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex>this.users.length)
      endIndex=this.users.length;
      this.usersOnPage=this.users.slice(startIndex,endIndex);
  }
  showUser(u:User){
    localStorage.setItem("shownUser",JSON.stringify(u));
    this.router.navigate(['viewProfile'])
  }
  
  

}
