import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: EmployeeListComponent}

];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
