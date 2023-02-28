import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environment/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  get_roles(){
    return this.http.get<any>(`${URL}/api/user/group`);
  }
  get_properties(){
    return this.http.get<any>(`${URL}/api/property`);
  }
  get_property(id:number){
    return this.http.get<any>(`${URL}/api/property/${id}`);
  }
  add_property(fd:any){
    return this.http.post(`${URL}/api/property`, fd);
  }
  update_property(fd:any){
    return this.http.put(`${URL}/api/property/${fd.get('id')}`, fd);
  }
  delete_property(id:number){
    return this.http.delete(`${URL}/api/property/${id}`);
  }
  get_room_categories(){
    return this.http.get<any>(`${URL}/api/room/category`);
  }
  get_room_category(id:number){
    return this.http.get<any>(`${URL}/api/room/category/${id}`);
  }
  add_room_category(fd:any){
    return this.http.post(`${URL}/api/room/category`, fd);
  }
  update_room_category(fd:any){
    return this.http.put(`${URL}/api/room/category/${fd.get('id')}`, fd);
  }
  delete_room_category(id:number){
    return this.http.delete(`${URL}/api/room/category/${id}`);
  }
  get_rooms(){
    return this.http.get<any>(`${URL}/api/room`);
  }
  get_room(id:number){
    return this.http.get<any>(`${URL}/api/room/${id}`);
  }
  add_room(fd:any){
    return this.http.post(`${URL}/api/room`, fd);
  }
  update_room(fd:any){
    return this.http.put(`${URL}/api/room/${fd.get('id')}`, fd);
  }
  delete_room(id:number){
    return this.http.delete(`${URL}/api/room/${id}`);
  }
  room_is_operational(fd:any){
    return this.http.patch(`${URL}/api/room/${fd.get('id')}`, fd);
  }
  get_room_rates(){
    return this.http.get<any>(`${URL}/api/room/rate`);
  }
  get_room_rate(id:number){
    return this.http.get<any>(`${URL}/api/room/rate/${id}`);
  }
  add_room_rate(fd:any){
    return this.http.post(`${URL}/api/room/rate`, fd);
  }
  update_room_rate(fd:any){
    return this.http.put(`${URL}/api/room/rate/${fd.get('id')}`, fd);
  }
  delete_room_rate(id:number){
    return this.http.delete(`${URL}/api/room/rate/${id}`);
  }
  get_users(){
    return this.http.get<any>(`${URL}/api/user/reg`);
  }
  get_user(id:number){
    return this.http.get<any>(`${URL}/api/user/reg/${id}`);
  }
  add_user(fd:any){
    return this.http.post(`${URL}/api/user/reg`, fd);
  }
  update_user(fd:any){
    return this.http.patch(`${URL}/api/user/reg/${fd.get('id')}`, fd);
  }
  delete_user(id:number){
    return this.http.delete(`${URL}/api/user/reg/${id}`);
  }
  change_user_password(fd:any){
    return this.http.put(`${URL}/api/user/update/password/${fd.get('id')}`, fd);
  }
  search_rooms(checkin_date: Date, checkout_date: Date){
    return this.http.get<any>(`${URL}/api/room/search?checkin_date=${checkin_date}&${checkout_date}`)
  }
}
