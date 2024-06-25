import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carreira } from '../models/races.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) { }

  getRaces(): Observable<Carreira[]> {

    const currentDate = new Date().toISOString().split('T')[0];
    return this.http.get<Carreira[]>(`${environment.baseUrl}/races?startDate=${currentDate}`)
  }
}
