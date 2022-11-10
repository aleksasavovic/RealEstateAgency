import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { ConversationService } from '../services/conversation.service';
import { PromotedService } from '../services/promoted.service';
import { RealEstateService } from '../services/real-estate.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {

  constructor(private router: Router, private promotedService: PromotedService, private reService: RealEstateService, private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.edit = false;
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user)
    this.router.navigate([""]);
    this.realEstate = JSON.parse(localStorage.getItem("realEstate"));
    if (!this.realEstate)
      this.router.navigate([""]);
    this.pictureIndex = 0;
    if (this.user.type == 'agent') {
      this.promotedService.isPromoted(this.realEstate._id).subscribe(re => {
        if (re)
          this.isPromoted = true;
        else
          this.isPromoted = false;

      });
    }
    if(this.realEstate.aproved=='yes'){
    var name=this.user.username;
    var alreadyViewed=false;
    if(this.realEstate.viewed && this.realEstate.viewed.length>0){
      this.realEstate.viewed.forEach(u=>{
        if(u==name){
          alreadyViewed=true;
        }
      });
    }
    if(!alreadyViewed){
      this.reService.realEstateViews(this.realEstate._id,name).subscribe(se=>{
        this.reService.getRealEstateById(this.realEstate._id).subscribe((re:RealEstate)=>{
          this.realEstate=re;
          localStorage.setItem("realEstate",JSON.stringify(re));
        })
      })
    }
  }
   
    

    

    this.titleEdit = this.realEstate.title;
    this.stateEdit = this.realEstate.adress.state;
    this.cityEdit = this.realEstate.adress.city;
    this.streetEdit = this.realEstate.adress.street;
    this.priceEdit = this.realEstate.price;
    this.reasonEdit = this.realEstate.reason;
    this.quadratureEdit = this.realEstate.quadrature;
    this.equipedEdit = this.realEstate.equiped;
    this.roomsEdit = this.realEstate.rooms;
    this.floorsEdit = this.realEstate.floors;
    this.onFloorEdit = this.realEstate.onFloor;
    this.typeEdit = this.realEstate.type;
    this.participation = this.realEstate.price / 5;
    //var date1= new Date().getTime();
    //var date2 = new Date(this.realEstate.date).getTime();
    //console.log((date1-date2)/(1000*3600));
    //console.log((date2-date1)/60000);
  }
  user: User;
  realEstate: RealEstate;
  pictureIndex: number;
  isPromoted;
  paymentMethod = "cash";
  participation: number;
  edit: boolean;
  titleEdit: string;
  typeEdit: string;
  onFloor: number;
  floorsEdit: number;
  roomsEdit: number;
  equipedEdit: string;
  quadratureEdit: number;
  reasonEdit: string;
  priceEdit: number;
  cityEdit: string;
  stateEdit: string;
  onFloorEdit: number;
  streetEdit: string;
  pictures: File[];
  numOfPics: number;
  msg: string;


  moveLeft() {
    this.pictureIndex--;
    if (this.pictureIndex < 0)
      this.pictureIndex = this.realEstate.pictures.length - 1;
  }
  moveRight() {
    this.pictureIndex = (this.pictureIndex + 1) % this.realEstate.pictures.length;
  }

  removeFromPromoted() {
    this.promotedService.removeFromPromoted(this.realEstate._id).subscribe(msg => {

    });
    this.isPromoted = false;
  }

  promoteRealEstate() {
    this.promotedService.promoteRealEstate(this.realEstate._id).subscribe(msg => {
      this.isPromoted = true;
    });
  }

  aproveRealEstate() {
    this.reService.aproveRealEstate(this.realEstate._id).subscribe(msg => {
      this.reService.getRealEstateById(this.realEstate._id).subscribe((r:RealEstate)=>{
        this.realEstate=r;
        localStorage.setItem("realEstate", JSON.stringify(this.realEstate));
      })
    })
  }

  declineRealEstate(){
    this.reService.declineRealEstate(this.realEstate._id).subscribe(msg=>{
      this.router.navigate(['showAllRealEstates']);
    })
  }
  contactOwner() {
    var msgDetails = {
      initiator: this.user.username,
      reciever: this.realEstate.owner,
      realEstateID: this.realEstate._id,
      title: this.realEstate.title
    }
    localStorage.setItem("msg", JSON.stringify(msgDetails));
    localStorage.removeItem("conversation");
    this.router.navigate(['privateChat']);
  }
  editF() {
    this.edit = true;
  }
  save() {
    this.msg = "";


    if (this.roomsEdit == undefined || this.floorsEdit == undefined || this.priceEdit == undefined || this.titleEdit == "" || this.cityEdit == "" || this.stateEdit == "" || this.streetEdit == "") {
      this.msg = "Please fill all required fileds";

    }
    else if (this.typeEdit == "apartment" && this.onFloorEdit == undefined) {
      this.msg = "Please fill all required fields";

    }

    else {
      if (this.realEstate.title != this.titleEdit)
        this.conversationService.updateTitles(this.realEstate._id, this.titleEdit).subscribe(msg => {

        });
      this.reService.edit(this.titleEdit, this.stateEdit, this.cityEdit, this.streetEdit, this.typeEdit, this.equipedEdit, this.quadratureEdit, this.roomsEdit, this.floorsEdit, this.onFloorEdit, this.reasonEdit, this.priceEdit, this.realEstate._id).subscribe((re: RealEstate) => {
        this.realEstate = re;
        localStorage.setItem("realEstate", JSON.stringify(this.realEstate));
        this.edit = false;
        this.restartValues();
      })


    }
  }

  upload(e: any) {
    this.msg = "";
    this.pictures = e.target.files;
    
    this.numOfPics = 0;
    for (var i = 0; i < this.pictures.length; i++) {
      if (!this.checkPictureFormat(this.pictures[i].name)) {
        this.pictures = null;
        this.msg = "Pictures are in wrong format";
        break;

      }
      if (this.isPicture(this.pictures[i].name))
        this.numOfPics++;
    }
    if (this.pictures && this.pictures.length < 3) {
      this.msg = "You have to upload at least 3 pictures/videos";
    }
    if (this.numOfPics == 0)
      this.msg = "You have to upload at least 1 picture";
    if (this.msg == "")
      this.reService.changePictures(this.pictures, this.realEstate._id).subscribe(msg => {
        this.reService.getRealEstateById(this.realEstate._id).subscribe((re: RealEstate) => {
          this.realEstate = re;
          localStorage.setItem("realEstate",JSON.stringify(this.realEstate));
        })
      })

  }

  checkPictureFormat(pictureName): boolean {
    const regex = /.*\.(gif|jpe?g|bmp|png|mp4)$/igm;
    return regex.test(pictureName);
  }
  isPicture(pictureName): boolean {
    const regex = /.*\.(jpe?g|bmp|png)$/igm;
    return regex.test(pictureName);

  }

  restartValues() {
    this.titleEdit = this.realEstate.title;
    this.stateEdit = this.realEstate.adress.state;
    this.cityEdit = this.realEstate.adress.city;
    this.streetEdit = this.realEstate.adress.street;
    this.priceEdit = this.realEstate.price;
    this.reasonEdit = this.realEstate.reason;
    this.quadratureEdit = this.realEstate.quadrature;
    this.equipedEdit = this.realEstate.equiped;
    this.roomsEdit = this.realEstate.rooms;
    this.floorsEdit = this.realEstate.floors;
    this.onFloorEdit = this.realEstate.onFloor;
    this.typeEdit = this.realEstate.type;

  }

}
