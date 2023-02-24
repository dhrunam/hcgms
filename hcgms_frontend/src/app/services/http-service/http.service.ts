import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environment/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
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
}
