import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TicketDTO } from '../models/ticket-dto';

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {
  private apiUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  searchForPt(obj: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `get-patient-history/${obj}`);
  }

  addTicket(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `add-new-ticket`, obj);
  }
}
