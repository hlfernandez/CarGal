import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carreira } from '../models/races.model';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) { }

  getRaces(): Observable<Carreira[]> {
    return this.http.get<Carreira[]>('http://localhost:1234/races')
  }
}
