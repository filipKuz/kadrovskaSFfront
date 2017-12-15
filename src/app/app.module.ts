import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { HttpModule } from '@angular/http';
import { AnnualHolidayRegulationComponent } from './annual-holiday-regulation/annual-holiday-regulation.component';
import { AnnualHolidayRegulationService } from './annual-holiday-regulation/annualHolidayRegulation.service';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AnnualHolidayRegulationComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [EmployeeService,AnnualHolidayRegulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
