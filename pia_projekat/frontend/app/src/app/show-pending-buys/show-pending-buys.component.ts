import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Conversation } from '../model/conversation.model';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { ConversationService } from '../services/conversation.service';
import { RealEstateService } from '../services/real-estate.service';

@Component({
  selector: 'app-show-pending-buys',
  templateUrl: './show-pending-buys.component.html',
  styleUrls: ['./show-pending-buys.component.css']
})
export class ShowPendingBuysComponent implements OnInit {

  constructor(private conversationService: ConversationService, private reService: RealEstateService, private router: Router) { }

  async ngOnInit() {
    this.startIndex = 0;
    this.onPage = 0;
    this.user = JSON.parse(localStorage.getItem("user"));
    if(!this.user || this.user.type=='regular')
      this.router.navigate(['']);
    this.iter = 0;
    this.conversationService.getPendingDeals().subscribe(async (convs: Conversation[]) => {
      this.pendingDeals = convs;
      this.realEstates = new Array<RealEstate>(this.pendingDeals.length);
      for (var i = 0; i < this.pendingDeals.length; i++) {
        await this.initRealEstates(this.pendingDeals[i].realEstateId, i);
      }
      this.conversationsOnPage = this.pendingDeals.slice(0, this.pageSize);
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
  onPage: number;
  pageSize: number = 2;
  pendingDeals: Conversation[];
  realEstates: RealEstate[];
  iter: number

  showRealEstate(re: RealEstate) {
    localStorage.setItem("realEstate", JSON.stringify(re));
    this.router.navigate(['realEstateView']);

  }

  decline(conv: Conversation) {
    this.conversationService.declinePendingDeal(conv._id).subscribe(msg => {
      this.conversationService.getPendingDeals().subscribe(async (convs: Conversation[]) => {
        this.pendingDeals = convs;
        this.realEstates = new Array<RealEstate>(this.pendingDeals.length);
        for (var i = 0; i < this.pendingDeals.length; i++) {
          await this.initRealEstates(this.pendingDeals[i].realEstateId, i);
        }
        var endIndex = this.startIndex + this.pageSize;
        if (endIndex > this.realEstates.length)
          endIndex = this.realEstates.length;
        this.conversationsOnPage = this.pendingDeals.slice(this.startIndex, endIndex);
      });
    })
  }

  aprove(conv: Conversation) {
    this.conversationService.aprovePendingDeal(conv._id, conv.realEstateId).subscribe(msg => {
      this.conversationService.getPendingDeals().subscribe(async (convs: Conversation[]) => {
        this.pendingDeals = convs;
        this.realEstates = new Array<RealEstate>(this.pendingDeals.length);
        for (var i = 0; i < this.pendingDeals.length; i++) {
          await this.initRealEstates(this.pendingDeals[i].realEstateId, i);
        }
        var endIndex = this.startIndex + this.pageSize;
        if (endIndex > this.realEstates.length)
          endIndex = this.realEstates.length;
        this.conversationsOnPage = this.pendingDeals.slice(this.startIndex, endIndex);
      });
    });
  }
  getIndex(i: number) {

    return i + this.startIndex;

  }
  pageEvent(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.onPage = event.pageIndex;
    let endIndex = this.startIndex + event.pageSize;
    if (endIndex > this.realEstates.length)
      endIndex = this.realEstates.length;
    this.conversationsOnPage = this.pendingDeals.slice(this.startIndex, endIndex);
  }
  isPicture(pictureName): boolean {
    const regex = /.*\.(jpe?g|bmp|png)$/igm;

    return regex.test(pictureName);
  }
  getPicture(realEstate: RealEstate) {
    for (var i = 0; i < realEstate.pictures.length; i++)
      if (this.isPicture(realEstate.pictures[i]))
        return realEstate.pictures[i];
    return realEstate.pictures[0];
  }
  user: User;


}
