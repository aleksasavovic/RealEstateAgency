import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotedService {

  constructor(private http:HttpClient) { }
 
  url = 'http://localhost:4000';

  isPromoted(id){
    const data={
      id:id
    }
    return this.http.post(`${this.url}/isPromoted`,data);
  }
  promoteRealEstate(id){
    const data={
      id:id
    }
    return this.http.post(`${this.url}/promoteRealEstate`,data);
  }
  removeFromPromoted(id){
    const data={
      id:id
    }
    return this.http.post(`${this.url}/removeFromPromoted`,data);
  }
}
