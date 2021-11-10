import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  queryText: string='';
  public projects:any[]=[];
  totalProjects: number | undefined;
  page:number=1;

  constructor(private _projectsService: ProjectsService) { }
  ChangeStatus(project: any, status: any) {
    this._projectsService.change(project,status).subscribe();
    window.location.reload();
  }
  ngOnInit(): void {
    this._projectsService.projects().subscribe(data => {
      this.projects=data;
      this.totalProjects= data.length;
    });
  }
  Search(){
    if(this.queryText==""){
      this.ngOnInit();
    }else {
      this.projects=this.projects.filter(res =>{
        return res.Theme.toLowerCase().match(this.queryText.toLowerCase());
      })
    }
  }

}
