import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { RealEstateService } from '../services/real-estate.service';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.css']
})
export class AddRealEstateComponent implements OnInit {

  constructor(private reService : RealEstateService, private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user){
      this.router.navigate(['']);
    }
  }
  user:User;
  title:string;
  city:string;
  state:string;
  street:string;
  adress:Object;
  type:string="house";
  equiped:string="yes";
  quadrature:number;
  rooms:number;
  numberOfFloors:number;
  onFloor:number;
  reason:string="sell";
  price:number;
  pictures:FileList=null;
  numOfPics;
  

  msg:string="";

  addNew(){
    console.log(this.onFloor);
    if(this.rooms==undefined || this.rooms==undefined || this.numberOfFloors==undefined || this.price==undefined || this.title=="" || this.city==""|| this.state==""|| this.street==""){
      this.msg="Please fill all required fileds";
    }
    else if(this.type=="apartment" && this.onFloor==undefined){
      this.msg="Please fill all required fields";
    }
    else if(!this.pictures || this.pictures.length<3){
      this.msg="You must choose at least 3 pictures/videos";
    }
    else if(this.numOfPics==0){
      this.msg="You have to upload at least 1 picture";
    }
    else{
      var usersWhoViewed=[];
      if(this.user.type=='regular')
        this.reService.addNewRealEstate(this.title,this.state,this.city,this.street,this.type,this.equiped,this.quadrature,this.rooms,this.numberOfFloors,this.onFloor,this.reason,this.price,this.pictures,this.user.username,"no",usersWhoViewed,0).subscribe(ret=>{
          this.snackBar.open("Real Estate successfully added",'Dismiss');
          
      });
      else
        this.reService.addNewRealEstate(this.title,this.state,this.city,this.street,this.type,this.equiped,this.quadrature,this.rooms,this.numberOfFloors,this.onFloor,this.reason,this.price,this.pictures,"agency","yes",usersWhoViewed,0).subscribe(ret=>{
          this.snackBar.open("Real Estate successfully added",'Dismiss');

        });
  }

}

  upload(e:any){
    this.msg="";
    this.pictures=e.target.files;
    this.numOfPics=0;
    for(var i=0;i<this.pictures.length;i++){
      if(!this.checkPictureFormat(this.pictures[i].name)){
        this.pictures=null;
        this.msg="Pictures are in wrong format";
        break;
       
      }
      if(this.isPicture(this.pictures[i].name))
        this.numOfPics++;
   }
   if(this.pictures && this.pictures.length<3){
     this.msg="You have to upload at least 3 pictures/videos";
   }
   if(this.numOfPics==0)
    this.msg="You have to upload at least 1 picture"
    
    
  }

  checkPictureFormat(pictureName):boolean{
    const regex=/.*\.(gif|jpe?g|bmp|png|mp4)$/igm;
    return regex.test(pictureName);
  }
  isPicture(pictureName):boolean{
    const regex=/.*\.(jpe?g|bmp|png)$/igm;
    return regex.test(pictureName);

  }
}
