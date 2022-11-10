import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Profit } from '../model/profit.model';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-show-all-real-estates',
  templateUrl: './show-all-real-estates.component.html',
  styleUrls: ['./show-all-real-estates.component.css']
})
export class ShowAllRealEstatesComponent implements OnInit {

  constructor(private router : Router, private reService:RealEstateService,private userService:UserService) { }

  ngOnInit(): void {
    
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user || this.user.type=='regular')
      this.router.navigate(['']);
    this.reService.getAllRealEstates().subscribe((re:RealEstate[])=>{
      this.realEstates=re;
      this.realEstatesOnPage=this.realEstates.slice(0,this.pageSize);
    });
    
   
  }
  user:User;
  realEstates:RealEstate[];
  realEstatesOnPage: RealEstate[];
  startIndex:number;
  endIndex:number;
  pageSize:number =8;
  profit:Profit;


  pageEvent(event: PageEvent){
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex>this.realEstates.length)
      endIndex=this.realEstates.length;
      this.realEstatesOnPage=this.realEstates.slice(startIndex,endIndex);
  }
  showRealEstate(re:RealEstate){
    localStorage.setItem("realEstate",JSON.stringify(re));
    this.router.navigate(["/realEstateView"])
  }
  isPicture(pictureName):boolean{
    const regex=/.*\.(jpe?g|bmp|png)$/igm;
   
    return regex.test(pictureName);
}
getPicture(realEstate:RealEstate){
  for(var i=0;i<realEstate.pictures.length;i++)
    if(this.isPicture(realEstate.pictures[i]))
      return realEstate.pictures[i];
  return realEstate.pictures[0];
}

}
