import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NewprojectComponent } from './components/newproject/newproject.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'projects', component : ProjectsComponent},
  {path : 'dashboard', component : DashboardComponent},
  {path : 'newproject', component : NewprojectComponent},
  {path : '', redirectTo : '/login', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
