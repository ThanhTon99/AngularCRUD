import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { NotifyModel } from './notify';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://localhost:3000/posts"
  item : NotifyModel[] = [];

  constructor(
    private http: HttpClient,
  ) { }
  
  getItems(){
    return this.item
  }

  getNotify(){
    return this.http.get(this.url).pipe(map((res:any)=>{
      return res
    }))
  }
  postNotify(data: any){
    return this.http.post(this.url, data).pipe(map((res:any)=>{
      return res
    }))
  }
  updateNotify(data: any, id: number){
    return this.http.put(`${this.url}/${id}`,data).pipe(map((res:any)=>{
      return res
    }))
  }
  deleteNotify(id: number){
    return this.http.delete(`${this.url}/${id}`).pipe(map((res:any)=>{
      return res
    }))
  }
}
