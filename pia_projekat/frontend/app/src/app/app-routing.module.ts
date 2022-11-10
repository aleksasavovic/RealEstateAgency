import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMultipleRealEstatesComponent } from './add-multiple-real-estates/add-multiple-real-estates.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminComponent } from './admin/admin.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { ProfileComponent } from './profile/profile.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { RegisterComponent } from './register/register.component';
import { ShowAllRealEstatesComponent } from './show-all-real-estates/show-all-real-estates.component';
import { ShowAllUsersComponent } from './show-all-users/show-all-users.component';
import { ShowConfirmedBuysComponent } from './show-confirmed-buys/show-confirmed-buys.component';
import { ShowPendingBuysComponent } from './show-pending-buys/show-pending-buys.component';
import { ShowPendingRealEstatesComponent } from './show-pending-real-estates/show-pending-real-estates.component';
import { ShowUserRealEstatesComponent } from './show-user-real-estates/show-user-real-estates.component';
import { ShowUsersWaitingForAprovalComponent } from './show-users-waiting-for-aproval/show-users-waiting-for-aproval.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"admin", component:AdminComponent},
  {path:"realEstateView",component:RealEstateComponent},
  {path:"profile",component:ProfileComponent},
  {path:"changePassword",component:ChangePasswordComponent},
  {path:"addRealEstate",component:AddRealEstateComponent},
  {path:"showYourRealEstates",component:ShowUserRealEstatesComponent},
  {path:"agentHome",component:AgentHomeComponent},
  {path:"showAllRealEstates",component:ShowAllRealEstatesComponent},
  {path:"showPendingRealEstates",component:ShowPendingRealEstatesComponent},
  {path:"privateChat", component:PrivateChatComponent},
  {path:"inbox",component:InboxComponent},
  {path:"showPendingBuys",component:ShowPendingBuysComponent},
  {path:"showConfirmedBuys",component:ShowConfirmedBuysComponent},
  {path:"addUser",component:AddUserComponent},
  {path:"showAllUsers",component:ShowAllUsersComponent},
  {path:"showUsersWaitingForAproval",component:ShowUsersWaitingForAprovalComponent},
  {path:"viewProfile",component:ViewProfileComponent},
  {path:"addMultipleRealEstates",component:AddMultipleRealEstatesComponent},
  {path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
