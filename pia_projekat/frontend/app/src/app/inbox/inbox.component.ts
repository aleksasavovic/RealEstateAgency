import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isObservable } from 'rxjs';
import { Conversation } from '../model/conversation.model';
import { User } from '../model/user.model';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private conversationService: ConversationService, private router: Router) { }

  ngOnInit(): void {
    this.inboxType = "active";
    this.user = JSON.parse(localStorage.getItem("user"));
    if(!this.user ||this.user.type=='admin'){
      this.router.navigate(['']);
    }

    if (this.user.type == 'regular')
      this.name = this.user.username;
    else 
      this.name = "agency"
    this.conversationService.getActiveConversationsForUser(this.name).subscribe((convs: Conversation[]) => {
      this.conversations = this.conversationService.sortByDate(convs);

    })

  }
  inboxType: string;
  user: User;
  name: string;
  conversations: Conversation[];

  privateConversation(conversation: Conversation) {
    var buyerSeller;
    if(conversation.buyer==this.name)
      buyerSeller='buyer';
    else buyerSeller='seller';
    console.log(buyerSeller);
    this.conversationService.seen(conversation._id,buyerSeller).subscribe(res=>{
      
    });
    localStorage.setItem("conversation", JSON.stringify(conversation));
    this.router.navigate(['/privateChat']);
  }
  archive(conversation: Conversation) {
    console.log("archive started");
    var type: string;
    if (this.user.type == 'agent' || this.user.type=='admin')
      type = "Seller";
    else {
      if (this.user.username == conversation.buyer)
        type = "Buyer";
      else type = "Seller";
    }

    this.conversationService.archiveConversation(type, conversation._id).subscribe((conv:any) => {
      console.log(conv);

    });
    var i;
    for (i = 0; i < this.conversations.length; i++)
      if (this.conversations[i]._id == conversation._id)
        break;

    this.conversations.splice(i, 1);

  }
  moveToActive(conversation: Conversation) {
    console.log("back to active started");
    var type: string;
    if (this.user.type == 'agent' || this.user.type=='admin')
      type = "Seller";
    else {

      if (this.user.username == conversation.buyer)
        type = "Buyer";
      else type = "Seller";
    }
    this.conversationService.moveToActive(type, conversation._id).subscribe((conv:any) => {
      console.log(conv);

    });
    var i;
    for (i = 0; i < this.conversations.length; i++)
      if (this.conversations[i]._id == conversation._id)
        break;

    this.conversations.splice(i, 1);

  }
  archivedMessages() {
    this.inboxType = "archived";

    this.conversationService.getArchivedConversations(this.name).subscribe((convs: Conversation[]) => {
      this.conversations = this.conversationService.sortByDate(convs);
    });
  }
  activeMessages() {
    this.inboxType = "active";
    this.conversationService.getActiveConversationsForUser(this.name).subscribe((convs: Conversation[]) => {
      this.conversations = this.conversationService.sortByDate(convs);

    })

  }
  isSeen(conversation:Conversation){
    if((conversation.seenByBuyer==false && conversation.buyer==this.name)||(conversation.seenBySeller==false && conversation.seller==this.name))
      return true;
    else return false;
  }
}
