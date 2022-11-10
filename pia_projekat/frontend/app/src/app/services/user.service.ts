import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:4000';
  
  constructor(private http : HttpClient, private router : Router) { }

  login(useranme,password){
    const data={
      username:useranme,
      password:password
    }
    return this.http.post(`${this.url}/login`,data);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    
  }
  register(username,password,firstName,lastName,email,city,type,picture,banList,aproved){

    const data={
      username:username,
      password:password,
      firstName:firstName,
      lastName:lastName,
      email:email,
      city:city,
      picture:picture,
      banList:banList,
      type:type,
      aproved:aproved
    }
    console.log(data);
    return this.http.post(`${this.url}/register`,data);
  }
  changePicture(picture,username){
    console.log(picture);
    const file = new FormData();
    
    file.append("picture",picture);
    file.append("username",username);
    console.log(file);
    return this.http.post(`${this.url}/changeProfilePicture`,file);

  }
  editUserData(username,whatToEdit,editValue){
    
    const data={
      username:username,
      editValue:editValue,
      whatToEdit:whatToEdit
      
    }
    return this.http.post(`${this.url}/editUserInfo`,data);

  }
  changePassword(username,password){
    const data={
      username:username,
      password:password
    }
    return this.http.post(`${this.url}/changePassword`,data);
  }
  blockUser(username,blockUser){
    const data={
      username:username,
      blockUser:blockUser
    }
    return this.http.post(`${this.url}/blockUser`,data);
  }
  unblockUser(username,blockedUserIndex){
    const data={
      username:username,
      blockedUserIndex:blockedUserIndex
    }
    return this.http.post(`${this.url}/unblockUser`,data);
  }
  getBlockList(username){
    console.log(username);
    const data={
      username:username
    }
    console.log(username);
    return this.http.post(`${this.url}/getBlockList`,data);
  }

  getProfit(){
    return this.http.get(`${this.url}/getProfit`);
  }
  getUserByUsername(username){
      var data={
        username:username
      }
      return this.http.post(`${this.url}/getUserByUsername`,data);
  }
  updateFee(fee){
    var data={
      fee:fee
    }
    return this.http.post(`${this.url}/updateFee`,data);

  }
  getAllUsers(){
    return this.http.get(`${this.url}/getAllUsers`);
  }
  getUsersWaitingForAproval(){
    return this.http.get(`${this.url}/getUsersWaitingForAproval`);
  }
  aproveUser(username){
    const data={
      username:username
    }
    console.log(username);
    return this.http.post(`${this.url}/aproveUser`,data);
  }
  declineUser(username){
    const data={
      username:username
    }
    return this.http.post(`${this.url}/declineUser`,data);
  }
  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      console.log(res.ip);
    });
  }

}
