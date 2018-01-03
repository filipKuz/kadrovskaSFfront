import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { Routes, RouterModule } from "@angular/router"; 
import { FormsModule } from '@angular/forms';
import { ProfessionalQualificationComponent } from './professional-qualification/professional-qualification.component';
import { ProfessionalQualificationService } from './professional-qualification/professional-qualification.service';
import { DialogComponent } from './dialog/dialog.component';
import { from } from 'rxjs/observable/from';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CityService } from './city/city.service';

import { NonworkingDayComponent } from './nonworking-day/nonworking-day.component';
import { NonworkingDaysService } from './nonworking-day/nonworkingDayService';
import { WorkPlaceService } from './work-place/work-place.service';
import { NgbdPaginationAdvanced } from './shared/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const appRoutes: Routes = [
  { path: '', component: EmployeeComponent},
  { path: 'employees', component: EmployeeComponent},
  { path: 'ProfessionalQualification', component: ProfessionalQualificationComponent },
  { path: 'nonworkingDay', component: NonworkingDayComponent },
    
  //{ path: 'employeePQ/:id', component: EmployeeProfessionalQualificationsComponent },  
];

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    EmployeeComponent,
    AnnualHolidayRegulationComponent,
    NavigationComponent,
    EmployeeProfessionalQualificationsComponent,
    ProfessionalQualificationComponent,
    NonworkingDayComponent, NgbdPaginationAdvanced
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgxMyDatePickerModule.forRoot(), NgbModule.forRoot()
  ],
  providers: [EmployeeService,
              AnnualHolidayRegulationService, 
              EmployeeProfessionalQualificationService,
              MessageService,
              ProfessionalQualificationService,
              CityService,
              NonworkingDaysService, WorkPlaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
