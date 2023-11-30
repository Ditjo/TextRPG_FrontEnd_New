import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';
import { httpOptions } from '../environment/httpOptions';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly apiUrl=environment.apiUrl+"Hero/";
  constructor(private http:HttpClient) { }

  GetAll():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.apiUrl);
  }

  GetById(id:number):Observable<Hero>{
    return this.http.get<Hero>(this.apiUrl+id);
  }

  Delete(id:number):Observable<void>{
    let i = this.http.delete<void>(this.apiUrl+id);
    return i;
  }

  Create(armour:Hero):Observable<void>{
    return this.http.post<void>(this.apiUrl, armour, httpOptions)
  }

  Update(armour:Hero):Observable<void>{
    return this.http.put<void>(this.apiUrl+armour.id, armour, httpOptions)
  }
}
