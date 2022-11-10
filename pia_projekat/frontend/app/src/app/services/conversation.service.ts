import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../model/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost:4000';

  sendMsg(isAgency,sender,reciever,realEstateId,text,title){
    var data={
      isAgency:isAgency,
      sender:sender,
      reciever:reciever,
      realEstateId:realEstateId,
      text:text,
      title:title

    }
    return this.http.post(`${this.url}/sendMsg`,data);
  }
  getConversation(sender,reciever,realEstateId){
    var data={
      sender:sender,
      reciever:reciever,
      realEstateId:realEstateId,
     
    }
    return this.http.post(`${this.url}/getConversation`,data);
  }

  getActiveConversationsForUser(username){
    var data={
      username:username
    }
    return this.http.post(`${this.url}/getActiveConversationsForUser`,data);
  }

  sortByDate(conversations:Conversation[]):Conversation[]{
    return conversations.sort((a,b)=>{
      if(a.newestDate>b.newestDate) return -1;
      else return 1;
    });
  }
  archiveConversation(type,id){
    console.log("archive service started");
    var data={
      type:type,
      id:id
    }
    return this.http.post(`${this.url}/archiveConversation`,data);
  }
  
  moveToActive(type,id){
    console.log("moveToActiveService started");
    var data={
      type:type,
      id:id
    }
    return this.http.post(`${this.url}/moveToActive`,data);
  }

  getArchivedConversations(username){
    var data={
      username:username
    }
    return this.http.post(`${this.url}/getArchivedConversations`,data);
  }

  sendOffer(id){
    var data={
      id:id
    }
    console.log("sendoffer service started");
    return this.http.post(`${this.url}/sendOffer`,data);
  }
  seen(id,buyerSeller){
    var data={
      id:id,
      buyerSeller:buyerSeller
    }
    return this.http.post(`${this.url}/seen`,data);
  }

  acceptOffer(id,owner,idR){
    console.log(owner);
    var data={
      id:id,
      owner:owner,
      idR:idR
    }
    return this.http.post(`${this.url}/acceptOffer`,data);
  }

  getPendingDeals(){
    return  this.http.get(`${this.url}/getPendingDeals`);
  }
  getDoneDeals(){
    return  this.http.get(`${this.url}/getDoneDeals`);
  }

  declinePendingDeal(id){
    var data={
      id:id
    }
    return this.http.post(`${this.url}/declinePendingDeal`,data);
  }
  aprovePendingDeal(id,idR){
    var data={
      id:id,
      idR:idR
    }
    return this.http.post(`${this.url}/aprovePendingDeal`,data);
  }
  updateTitles(id,title){
    var data={
      id:id,
      title:title
    }
    return this.http.post(`${this.url}/updateConversationTitles`,data);
  }

}
