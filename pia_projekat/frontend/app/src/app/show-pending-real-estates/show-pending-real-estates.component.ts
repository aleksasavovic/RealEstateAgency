import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { RealEstateService } from '../services/real-estate.service';

@Component({
  selector: 'app-show-pending-real-estates',
  templateUrl: './show-pending-real-estates.component.html',
  styleUrls: ['./show-pending-real-estates.component.css']
})
export class ShowPendingRealEstatesComponent implements OnInit {

  constructor(private router : Router, private reService:RealEstateService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user || this.user.type=='regular')
      this.router.navigate(['']);
    this.reService.getPendingRealEstates().subscribe((re:RealEstate[])=>{
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


  pageEvent(event: PageEvent){
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex>this.realEstates.length)
      endIndex=this.realEstates.length;
      this.realEstatesOnPage=this.realEstates.slice(startIndex,endIndex);
  }
  showRealEstate(re:RealEstate){
    
    localStorage.setItem("realEstate",JSON.stringify(re));
    this.router.navigate(["/realEstateView"]);
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
