import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient ) { }

  addPerson(date:any): Observable<any>{
    return this._http.post('http://localhost:3000/person',date );
  }
  updatePerson(id:number, date:any): Observable<any>{
    return this._http.put('http://localhost:3000/person/'+id,date );
  }
  getPersonList (): Observable<any>{
    return this._http.get('http://localhost:3000/person');
  }
  deletePersonList (id: number): Observable<any>{
    return this._http.delete ('http://localhost:3000/person/'+id);
  }
}
