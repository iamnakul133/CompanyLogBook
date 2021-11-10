import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewProjectService } from 'src/app/new-project.service';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  NewProjectForm = new FormGroup({
    Theme: new FormControl( ''),
    Reason: new FormControl(''),
    type1: new FormControl(''),
    Division: new FormControl(''),
    Category: new FormControl(''),
    Priority: new FormControl(''),
    Department: new FormControl(''),
    Location: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),

  });
  constructor(private auth: NewProjectService, private router: Router) { }
  onSubmit() : void {
    this.auth.addproject(this.NewProjectForm.value).subscribe(
      (res: any) =>{
        console.log(res);
        this.router.navigate(['/projects']);
      },(err: any)=> {
        this.router.navigate(['/newproject']);
      }
    )
  }
  ngOnInit(): void {
  }

}
