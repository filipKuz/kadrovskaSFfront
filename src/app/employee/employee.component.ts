import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees=[];

  constructor(private employeeService: EmployeeService) { }  

  ngOnInit() {
    this.onGet();
    
  }

  onGet() {
    this.employeeService.getEmployees()
      .subscribe(
        (response:any) => (this.employees = response,
          console.log(this.employees)),
        (error) => console.log(error)
      );
  }
  
}
