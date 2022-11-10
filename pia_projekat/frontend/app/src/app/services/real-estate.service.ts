import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealEstate } from '../model/realEstate.model';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000';

  guestSearch(city, min, max) {
    const data = {
      city: city,
      minPrice: min,
      maxPrice: max
    }
    return this.http.post(`${this.url}/guestSearch`, data);
  }
  getPromotedRealEstates() {
    console.log("servis poceo");
    return this.http.get(`${this.url}/promotedRealEstates`);
  }
  getUsersRealEstates(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.url}/getUsersRealEstates`, data);
  }

  getAllRealEstates() {
    return this.http.get(`${this.url}/getAllRealEstates`);
  }

  getPendingRealEstates() {
    return this.http.get(`${this.url}/getPendingRealEstates`);
  }

  addNewRealEstate(title, state, city, street, type, equiped, quadrature, rooms, floors, onFloor, reason, price, pictures, owner, aproved,viewed,views) {

    const data = new FormData();
    data.append("title", title);
    data.append("state", state);
    data.append("city", city);
    data.append("street", street);
    data.append("type", type);
    data.append("equiped", equiped);
    data.append("quadrature", quadrature);
    data.append("rooms", rooms);
    data.append("floors", floors);
    if (onFloor != undefined)
      data.append("onFloor", onFloor);
    data.append("reason", reason);
    data.append("price", price);
    data.append("owner", owner);
    data.append("aproved", aproved);
    data.append("viewed",viewed);
    data.append("views",views);
    for (let index = 0; index < pictures.length; index++) {
      const element = pictures[index];
      data.append('pictures', element);
    }

    return this.http.post(`${this.url}/addNewRealEstate`, data);
  }
  aproveRealEstate(id) {
    const data = {
      id: id
    }
    return this.http.post(`${this.url}/aproveRealEstate`, data);
  }
  declineRealEstate(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.url}/declineRealEstate`, data);
  }
  getRealEstateById(id) {
    console.log(id);
    const data = {
      id: id
    }
    return this.http.post(`${this.url}/getRealEstateById`, data);
  }
  edit(title, state, city, street, type, equiped, quadrature, rooms, floors, onFloor, reason, price, id) {

    const data = {
      title: title,
      state: state,
      city: city,
      street: street,
      type: type,
      equiped: equiped,
      quadrature: quadrature,
      rooms: rooms,
      floors: floors,
      onFloor: onFloor,
      reason: reason,
      price: price,
      id: id
    }
    return this.http.post(`${this.url}/updateRealEstateInfo`, data);
  }

  changePictures(pictures, id) {
    console.log("changePictures service");
    const data = new FormData();
    for (let index = 0; index < pictures.length; index++) {
      const element = pictures[index];
      data.append('pictures', element);
    }
    data.append("id", id);
    return this.http.post(`${this.url}/changeRealEstatePictures`, data);
  }
  addRealEstateFromFiles(title, state, city, street, type, equiped, quadrature, rooms, floors, onFloor, reason, price, pictures, owner, aproved) {

    var data = {
      title:title,
      state:state,
      street:street,
      type:type,
      equiped:equiped,
      quadrature:quadrature,
      rooms:rooms,
      floors:floors,
      onFloor:onFloor,
      reason:reason,
      price:price,
      pictures:pictures,
      owner:owner,
      aproved:aproved

    }
    
    return this.http.post(`${this.url}/addRealEstateFromFiles`, data);
  }

  realEstateViews(id,username) {
  
    const data = {
      id: id,
      username:username
    }
    return this.http.post(`${this.url}/realEstateViews`, data);
  }


}
