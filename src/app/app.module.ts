import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms'
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientsComponent } from './components/patients/patients.component';
import { CcdaPostsComponent } from './components/ccda-posts/ccda-posts.component';

import { PatientService } from './services/patient.service';
import { PatientListResolverService } from './services/patient-list-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientsComponent,
    CcdaPostsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [PatientService, PatientListResolverService],
  bootstrap: [AppComponent]
})

export class AppModule { }
