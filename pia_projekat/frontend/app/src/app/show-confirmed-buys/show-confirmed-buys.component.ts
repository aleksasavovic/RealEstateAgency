import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Conversation } from '../model/conversation.model';
import { Profit } from '../model/profit.model';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { ConversationService } from '../services/conversation.service';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-show-confirmed-buys',
  templateUrl: './show-confirmed-buys.component.html',
  styleUrls: ['./show-confirmed-buys.component.css']
})
export class ShowConfirmedBuysComponent implements OnInit {

  constructor(private router: Router, private conversationService: ConversationService, private reService: RealEstateService, private userService: UserService) { }

  async ngOnInit() {
    var user:User=JSON.parse(localStorage.getItem("user"));
    if(!user || user.type=='regular')
      this.router.navigate(['']);
    this.userService.getProfit().subscribe((pr: Profit) => {
      this.profit = pr;
      console.log(this.profit);
    })
    this.startIndex = 0;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.iter = 0;
    this.conversationService.getDoneDeals().subscribe(async (convs: Conversation[]) => {
      this.doneDeals = convs;
      console.log(this.doneDeals);
      this.realEstates = new Array<RealEstate>(this.doneDeals.length);
      var i = 0;
      for (; i < this.doneDeals.length; i++) {
        await this.initRealEstates(this.doneDeals[i].realEstateId, i);
      }
      if (i == this.doneDeals.length) {
        this.conversationsOnPage = this.doneDeals.slice(0, this.pageSize);

      }
    });



  }
  async initRealEstates(id, i) {
    this.reService.getRealEstateById(id).subscribe((re: RealEstate) => {
      this.realEstates[i] = re;
      console.log(re);
    }
    )
  }

  conversationsOnPage: Conversation[];
  startIndex: number;
  endIndex: number;
  pageSize: number = 2;
  user: User;
  doneDeals: Conversation[];
  realEstates: RealEstate[];
  iter: number;
  profit: Profit;

  RealEstate(re: RealEstate) {
    localStorage.setItem("realEstate", JSON.stringify(re));
    this.router.navigate(['realEstateView']);

  }
  getIndex(i: number) {

    return i + this.startIndex;

  }
  pageEvent(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;

    let endIndex = this.startIndex + event.pageSize;
    if (endIndex > this.realEstates.length)
      endIndex = this.realEstates.length;
    this.conversationsOnPage = this.doneDeals.slice(this.startIndex, endIndex);
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
