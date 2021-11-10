import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private  dashboard_url = 'http://localhost:5000/dashboard';
  constructor(private http : HttpClient) { }
  dashboard(){
    return this.http.get<any>(this.dashboard_url);
  }

}
