import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MenuComponent } from './menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { RealEstateComponent } from './real-estate/real-estate.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { ShowUserRealEstatesComponent } from './show-user-real-estates/show-user-real-estates.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { ShowAllRealEstatesComponent } from './show-all-real-estates/show-all-real-estates.component';
import { ShowPendingRealEstatesComponent } from './show-pending-real-estates/show-pending-real-estates.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { InboxComponent } from './inbox/inbox.component';
import {MatRadioModule} from '@angular/material/radio';
import { ShowPendingBuysComponent } from './show-pending-buys/show-pending-buys.component';
import { ShowConfirmedBuysComponent } from './show-confirmed-buys/show-confirmed-buys.component';
import { ShowAllUsersComponent } from './show-all-users/show-all-users.component';
import { ShowUsersWaitingForAprovalComponent } from './show-users-waiting-for-aproval/show-users-waiting-for-aproval.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AddMultipleRealEstatesComponent } from './add-multiple-real-estates/add-multiple-real-estates.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    RealEstateComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AddRealEstateComponent,
    ShowUserRealEstatesComponent,
    AgentHomeComponent,
    ShowAllRealEstatesComponent,
    ShowPendingRealEstatesComponent,
    PrivateChatComponent,
    InboxComponent,
    ShowPendingBuysComponent,
    ShowConfirmedBuysComponent,
    ShowAllUsersComponent,
    ShowUsersWaitingForAprovalComponent,
    AddUserComponent,
    ViewProfileComponent,
    AddMultipleRealEstatesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatRadioModule,
    MatSnackBarModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
