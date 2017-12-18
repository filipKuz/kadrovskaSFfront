import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { HttpModule } from '@angular/http';
import { AnnualHolidayRegulationComponent } from './annual-holiday-regulation/annual-holiday-regulation.component';
import { AnnualHolidayRegulationService } from './annual-holiday-regulation/annualHolidayRegulation.service';
import { NavigationComponent } from './navigation/navigation.component';
import { EmployeeProfessionalQualificationsComponent } from './employee-professional-qualifications/employee-professional-qualifications.component';
import { EmployeeProfessionalQualificationService } from './employee-professional-qualifications/employee-professional-qualification.service';
import { MessageService } from './shared/message.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AnnualHolidayRegulationComponent,
    NavigationComponent,
    EmployeeProfessionalQualificationsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [EmployeeService,AnnualHolidayRegulationService, EmployeeProfessionalQualificationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
