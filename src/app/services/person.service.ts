import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//const url = "http://localhost:3000/person";
const url = "http://localhost:8081/person";



@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient ) { }

  addPerson(date:any): Observable<any>{
    return this._http.post(url,date );
  }
  updatePerson(id:number, date:any): Observable<any>{
    return this._http.put(url+'/'+id,date );
  }
  getPersonList (): Observable<any>{
    return this._http.get(url);
  }
  deletePersonList (id: number): Observable<any>{
    return this._http.delete (url+'/'+id);
  }
}
