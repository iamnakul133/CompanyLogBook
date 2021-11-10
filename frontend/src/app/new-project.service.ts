import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewProjectService {
  private  newproject_url = 'http://localhost:5000/newproject';
  constructor(private http : HttpClient) { }
  addproject(user : FormGroup) {
    return this.http.post<any>(this.newproject_url, user);
  }


}
