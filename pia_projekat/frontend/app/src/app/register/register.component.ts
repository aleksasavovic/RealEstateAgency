import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    var user:User=JSON.parse(localStorage.getItem("user"));
    if(user){
      this.router.navigate(['']);
    }
    this.firstName="";
    this.lastName="";
    this.email="";
    this.picture="";
    this.username="";
    this.password="";
    this.passwordRepeat="";
    this.city="";
    this.rout="";
  }
  rout:String;
  loading=false;
  hide=true;
  hideRepeat=true;
  firstName:string="";
  lastName:string="";
  email:string="";
  city:string="";
  picture: string="";
  username:string="";
  password:string="";
  passwordRepeat:string="";
  msg:string="";
  pic : File=null;

  checkMailFormat(email:string) :boolean{
    const regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }
  
  checkPictureFormat(pictureName):boolean{
    const regex=/.*\.(gif|jpe?g|bmp|png)$/igm;
    return regex.test(pictureName);
  }
  
  register(){
    this.loading=true;
    this.msg="";
    if(this.firstName=="" || this.lastName=="" || this.email=="" || this.city=="" || this.username=="" || this.password=="" || this.passwordRepeat==""){
      this.msg="Required fields must be filled";
      this.snackBar.open(this.msg,'Dismiss');
    }
    else if(!this.checkMailFormat(this.email)){
      this.msg="Invalid e-mail format";
      this.snackBar.open(this.msg,'Dismiss');
    }
    else if(this.password!=this.passwordRepeat){
      this.msg="Passwords don't match";
      this.snackBar.open(this.msg,'Dismiss');
    }
    else if(this.pic && !this.checkPictureFormat(this.pic.name)){
      this.msg="Wrong picture format";
      this.snackBar.open(this.msg,'Dismiss');
    }
    else{
      let pictureRep = this.picture;// Da se u formi ne bi prikazivalo "default.jpg u sucaju da se ne unese slika, a ne uspe registracija"
      
        var banList=[];
        let type="regular";
        this.userService.register(this.username,this.password,this.firstName,this.lastName,this.email,this.city,type,"default.jpg",banList,false).subscribe(ob=>{
          
        this.msg=ob['msg'];
        if(this.msg==""){
          if(this.pic!=null)
            this.userService.changePicture(this.pic,this.username).subscribe((o)=>{

          });
          this.router.navigate([""]);
        }
        else{
          this.snackBar.open(this.msg,'Dismiss');
        }
        });
    }
    this.loading=false;
  }
  guest(){
    this.router.navigate(['/home']);
  }
  login(){
    this.router.navigate([""]);
  }
  upload(event:any){
    this.pic=event.target.files[0];
  }
  
  
}
