import { keyframes } from '@angular/animations';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router, private service:RealEstateService,private userService:UserService) {
    this.user=JSON.parse(localStorage.getItem("user"));
    if(this.user && (this.user.type=='agent'||this.user.type=='admin')){
      this.router.navigate(['']);
    }
    
    service.getPromotedRealEstates().subscribe((re:RealEstate[])=>{
      this.promotedRealEstates=re;
      this.numberOfPromotedRE=5;
      this.promotedRealEstatesPerPage=this.promotedRealEstates.slice(0,this.numberOfPromotedRE);
      this.promotedStartIndex=0;
      this.promotedEndIndex=5;
      if(this.promotedRealEstates.length<=this.numberOfPromotedRE)
        this.disableRight=true;
      else 
        this.disableRight=false;
      
    });
   }

  ngOnInit(): void {
    this.hasSearched=false;
    this.startIndex=0;
    this.userService.getIPAddress();
    this.city="";
    this.user=JSON.parse(localStorage.getItem("user"));
    localStorage.removeItem("webpage");
  }

  login(){
    this.router.navigate(["/login"]);
  }
  hasSearched:boolean;
  minPrice:number;
  maxPrice:number;
  city:string;
  realEstates:RealEstate[];
  promotedRealEstates:RealEstate[];
  msg : string;
  realEstatesPerPage: RealEstate[];
  //promoted view variables
  promotedRealEstatesPerPage:RealEstate[];
  numberOfPromotedRE:number;
  promotedStartIndex:number;
  promotedEndIndex:number;
  disableLeft=true;
  disableRight:boolean;
  user:User;
  startIndex:number;
  pageSize:number
  @ViewChild('paginator') paginator: MatPaginator;


  search(){
    this.hasSearched=true;
    this.startIndex=0;
    let min :number;
    let max:number;
    console.log(this.maxPrice);
    if(this.minPrice==undefined && this.maxPrice==undefined && this.city==""){
      this.msg="at least one parameter has to be filled";
    }
    else{
      this.msg="";
      if(this.minPrice==undefined)
        min=0;
      else min=this.minPrice
      if(this.maxPrice==undefined)
        max=9007199254740991;
      else max = this.maxPrice;
      this.service.guestSearch(this.city,min,max).subscribe((re:RealEstate[])=>{
        this.realEstates=re;
        if(this.paginator)
          this.paginator.firstPage();
        this.realEstatesPerPage=this.realEstates.slice(0,2);
      });
    }
  }
  moveLeft(){
    this.promotedStartIndex--;
    this.promotedEndIndex--;
    if(this.disableRight==true)
      this.disableRight=false;
    if(this.promotedStartIndex==0)
      this.disableLeft=true;
    this.promotedRealEstatesPerPage=this.promotedRealEstates.slice(this.promotedStartIndex,this.promotedEndIndex);

  }
  moveRight(){
    this.promotedStartIndex++;
    this.promotedEndIndex++;
    if(this.disableLeft==true)
      this.disableLeft=false;
    if(this.promotedEndIndex==this.promotedRealEstates.length)
      this.disableRight=true;
    this.promotedRealEstatesPerPage=this.promotedRealEstates.slice(this.promotedStartIndex,this.promotedEndIndex);
    
  }
  
  pageEvent(event: PageEvent){
    this.startIndex = event.pageIndex*event.pageSize;
    let endIndex = this.startIndex+event.pageSize;
    if(endIndex>this.realEstates.length)
      endIndex=this.realEstates.length;
      this.realEstatesPerPage=this.realEstates.slice(this.startIndex,endIndex);
  }
  showRealEstate(re:RealEstate){
    if(this.user){
    localStorage.setItem("realEstate",JSON.stringify(re));
    this.router.navigate(["/realEstateView"])
  }
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
