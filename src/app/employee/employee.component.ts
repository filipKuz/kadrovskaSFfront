import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeProfessionalQualificationService } from '../employee-professional-qualifications/employee-professional-qualification.service';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees = [];
  EPQclicked: boolean = false; 
  constructor(private employeeService: EmployeeService, private _messageService: MessageService) { }

  ngOnInit() {
    this.onGet();

  }

  onGet() {
    this.employeeService.getEmployees()
      .subscribe(
      (response: any) => (this.employees = response),
      (error) => console.log(error)
      );
  }

  sendMessage(message:string): void {
    // send message to subscribers via observable subject
    this._messageService.sendMessage(message);
  }

  clearMessage(): void {
    // clear message
    this._messageService.clearMessage();
  }

}
