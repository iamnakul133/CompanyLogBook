import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects_url = 'http://localhost:5000/projects';

  private update_url ='http://localhost:5000/update';

  constructor(private http: HttpClient) {
  }

  projects() {
    return this.http.get<any[]>(this.projects_url);
  }
  change(project: any, status: string){
    return this.http.put<any>(this.update_url+"/"+project,{'status':status});
  }


}
