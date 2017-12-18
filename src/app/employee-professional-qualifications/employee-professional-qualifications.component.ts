import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeProfessionalQualificationService } from './employee-professional-qualification.service';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-employee-professional-qualifications',
  templateUrl: './employee-professional-qualifications.component.html',
  styleUrls: ['./employee-professional-qualifications.component.css']
})
export class EmployeeProfessionalQualificationsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  employeesEPQCs = [];
  mess: string = "22";

 
  constructor(private _employeePQC: EmployeeProfessionalQualificationService, private _messageService: MessageService) {
    this.subscription = this._messageService.getMessage()
                                            .subscribe(message => 
                                                { this.mess = message.text, console.log(this.mess + "  " + message.text), this.onGetEPQbyEmployeeId(message.text); }
                                              );
                                              
  }

  ngOnInit() {
  }

  onGetEPQbyEmployeeId(employeeId) {
    this._employeePQC.getByEmployee(employeeId)
      .subscribe(
      (response: any) => [(this.employeesEPQCs = response)],
      (error) => console.log(error)
      );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
