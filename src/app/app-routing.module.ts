import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'schedule/:id', component: PatientsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
