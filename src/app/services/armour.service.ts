import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { httpOptions } from '../environment/httpOptions'
import { Observable } from 'rxjs';
import { Armour } from '../models/armour';

// const httpOptions={
//   headers: new HttpHeaders({
//     'content-type' : 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root'
})

export class ArmourService {

  private readonly apiUrl=environment.apiUrl+"Armour/";
  constructor(private http:HttpClient) { }

  
  GetAll():Observable<Armour[]>{
    return this.http.get<Armour[]>(this.apiUrl);
  }

  GetById(id:number):Observable<Armour>{
    return this.http.get<Armour>(this.apiUrl+id);
  }

  Delete(id:number):Observable<void>{
    let i = this.http.delete<void>(this.apiUrl+id);
    return i;
  }

  Create(armour:Armour):Observable<void>{
    return this.http.post<void>(this.apiUrl, armour, httpOptions)
  }

  Update(armour:Armour):Observable<void>{
    return this.http.put<void>(this.apiUrl+armour.id, armour, httpOptions)
  }
}
