import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { RealEstateService } from '../services/real-estate.service';

@Component({
  selector: 'app-add-multiple-real-estates',
  templateUrl: './add-multiple-real-estates.component.html',
  styleUrls: ['./add-multiple-real-estates.component.css']
})
export class AddMultipleRealEstatesComponent implements OnInit {

  constructor(private router:Router,private service:RealEstateService) { }

  ngOnInit(): void {
    var user:User=JSON.parse(localStorage.getItem("user"));
    if(!user){
      this.router.navigate(['']);
    }
    else{
      if(user.type=='regular'||user.type=='agent')
        this.router.navigate(['']);
    }
    this.realEstates=null;
  }
  reader:FileReader;
  realEstates:RealEstate[];
  msg:string;

  upload(event){
    this.msg='';
    /*this.reader=new FileReader();
    this.reader.onload=this.onReaderLoad(event);
    this.reader.readAsText(event.target.files[0]);*/
    this.reader=new FileReader();
    this.reader.onload=()=>{
      var text =this.reader.result;
      try{
       this.realEstates=JSON.parse(text.toString());
       console.log(this.realEstates[0]);
        
      }
      catch(error)
      {
        console.log("pogresan format");
        this.msg='wrong file format';
        this.realEstates=null;
      }
      
    }
    this.reader.readAsText(event.target.files[0],'UTF-8');
    
    
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

add(){
  this.realEstates.forEach(re=>{
    this.service.addRealEstateFromFiles(re.title,re.adress.state,re.adress.city,re.adress.street,re.type,re.equiped,re.quadrature,re.rooms,re.floors,re.onFloor,re.reason,re.price,re.pictures,re.owner,re.aproved).subscribe(ret=>{
      if(ret['msg']=='error')
        this.msg="Error";
        
    })
  })
}

/*checkFormat(re:RealEstate):boolean{
  console.log(re.pictures.length);
  if(re.pictures.length<3){
    console.log("nikako");
    return false;
    
    
  }
  else{
    
    var check=false;
    re.pictures.forEach(pic=>{
      if(this.isPicture(pic))
        check=true;

    });
    return check;
  }
  
  
}*/

 /* onReaderLoad(event){
    console.log(123);
    console.log(event.target.result);
    var obj=JSON.parse(event.target.result);
    return obj;
  }*/

}
