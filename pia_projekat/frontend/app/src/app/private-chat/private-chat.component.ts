import { ConstantPool } from '@angular/compiler';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from '../model/conversation.model';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { ConversationService } from '../services/conversation.service';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {

  constructor(private router:Router,private conversationService: ConversationService, private userService: UserService, private realEstateService:RealEstateService) {

  }

  async ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user"));
    if(!this.user || this.user.type=='admin')
      this.router.navigate(['']);
   
    this.conversation = JSON.parse(localStorage.getItem("conversation"));
    //if user is entering conversation from inbox
    if (this.conversation) {
     
      this.realEstateId = this.conversation.realEstateId;
      await this.initRealEstate();
      console.log("123");
      if (this.user.type == 'agent' || this.user.type=='admin') {
        this.sender = this.user.username;
        this.reciever = this.conversation.buyer;
      }
      else if (this.user.type == 'regular') {
        this.sender = this.user.username;
        if (this.user.username == this.conversation.buyer)
          this.reciever = this.conversation.seller;
        else this.reciever = this.conversation.buyer;
      }
      this.title = this.conversation.title;
      
      
    }
    //if user is entering conversation from real estate page
    else {
      
      var msgDetails = JSON.parse(localStorage.getItem("msg"));
      if(!msgDetails){
        this.router.navigate(['']);
      }
      this.sender = msgDetails.initiator;
      this.title = msgDetails.title;
      this.realEstateId = msgDetails.realEstateID;
      this.reciever = msgDetails.reciever;
      await this.initRealEstate();
      
      this.conversationService.getConversation(this.sender, this.reciever, this.realEstateId).subscribe((conv: Conversation) => {
      
        this.conversation = conv;
        //if conversation already extists
        if(conv){
          this.newConversation=false;
          
        }
      });
      
    }
    //only regular users can be added and can have a blocklist
    if (this.user.type == 'regular') {
      //checking if logged in user is on the block list of the user he is communicating with
      var recieversBlockList: Array<Object>
      this.userService.getBlockList(this.reciever).subscribe((recieverBlockList: Array<Object>) => {
        recieversBlockList = recieverBlockList;
        if (recieversBlockList) {
          for (var i = 0; i < recieversBlockList.length; i++) {
            if (this.user.username == recieversBlockList[i]) {
              this.isBlocked = true;
              this.blockMsg = "You can't text to user who blocked you";
              break;
            }
          }
        }
      })
      //checking if the other user is on logged in user's blocked list
      for (var i = 0; i < this.user.blockList.length; i++) {

        if (this.reciever == this.user.blockList[i]) {
          this.blocked = true;
          this.blockMsg = "You can't text to user you blocked";
          break;
        }
      }
    }
    if(this.conversation){
      this.newConversation=false;
    //agents can't be blocked
    if (this.conversation.buyer == 'agency' || this.conversation.seller == 'agency')
      this.canBeBlocked = false;
    //agents are working for agency and are always owners
    if (this.conversation.seller == this.user.username || this.user.type == 'agent' || this.user.type=='admin')
      this.isOwner = true;
    this.offerSent = this.conversation.offerSent;
    }
    else{
      if(this.reciever=='agency')
        this.canBeBlocked=false;
    }
  
    
  }
  
  
  newConversation=true;
  offerSent = false;
  isBlocked = false;
  canBeBlocked = true;
  user: User;
  blockMsg: string;
  name: string;
  sender: string;
  reciever: string;
  msg: string;
  title: string;
  realEstateId: string;
  conversation: Conversation;
  blocked = false;
  isOwner = false;
  realEstate:RealEstate;


  async  initRealEstate() {
    this.realEstateService.getRealEstateById(this.realEstateId).subscribe((re:RealEstate)=>{
      this.realEstate=re;
      if(this.realEstate)
        console.log("re");
    });
    
  }

  sendMsg() {

    var isAgency: boolean = false;
    if (this.user.type == 'agent')
      isAgency = true;

    this.conversationService.sendMsg(isAgency, this.sender, this.reciever, this.realEstateId, this.msg, this.title).subscribe((conv: Conversation) => {
      this.conversation = conv;
      
    });
    this.newConversation=false;
  }
  //checking if message is comming from logged in user
  showRight(message): boolean {
    if (message.sender == this.user.username || (this.user.type == 'agent' && message.sender != this.conversation.buyer))
      return true;
    else return false;
  }

  block() {
    this.userService.blockUser(this.sender, this.reciever).subscribe(msg => {

    });
    this.user.blockList.push(this.reciever);
    localStorage.setItem("user", JSON.stringify(this.user));
    this.blocked = true;
    this.blockMsg = "You can't text to user you blocked";
  }

  unblock() {
    this.userService.unblockUser(this.sender, this.reciever).subscribe(msg => {
    });
    var i;
    for (i = 0; i < this.user.blockList.length; i++)
      if (this.user.blockList[i] == this.reciever)
        break;
    this.user.blockList.splice(i, 1);
    localStorage.setItem("user", JSON.stringify(this.user));
    this.blocked = false;
  }
  sendOffer() {
    this.conversation.offerSent = true;
    localStorage.setItem("conversation", JSON.stringify(this.conversation));
    this.conversationService.sendOffer(this.conversation._id).subscribe(res => {

    });
  }
  acceptOffer() {
    var isAgency: string = this.user.username;
    if (this.user.type == 'agent'){
      isAgency = 'agency';
      this.conversation.aprovedByAgent=true;
    }
    this.conversation.offerAccepted=true;
  
    localStorage.setItem("conversation", JSON.stringify(this.conversation));
    this.conversationService.acceptOffer(this.conversation._id,isAgency,this.realEstateId).subscribe(res => {

    });
  }



}
