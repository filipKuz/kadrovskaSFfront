import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';

@Component({
    selector: 'app-city-employees',
    templateUrl: './city-employees.component.html',
    styleUrls: ['./city-employees.component.css']
})
export class CityEmployeesComponent implements OnInit {

    employees = [];

    selectedRow: number;
    setClickedRow: Function;

    clickedEmployeeId;

    pqNameVar: string;
    pqDegreeVar: string;

    subscription: Subscription;
    constructor(private _employeeService: EmployeeService, private _messageService: MessageService) {
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        };
        this.subscription = this._messageService.getMessage()
            .subscribe(message => { this.onGetEmployeesByCity(message.text); }
            );
    }

    ngOnInit() {
        this.getAllEmployees();
    }

    onGetEmployeesByCity(cityId: number) {
        this._employeeService.getEmployeeByCityId(cityId)
            .subscribe(
            (response: any) => [(this.employees = response)],
            (error) => console.log(error)
            );
    }

    getAllEmployees() {

        this._employeeService.getEmployees()
            .subscribe(
            (response: any) => [(this.employees = response)],
            (error) => console.log(error)
            );
    }

    onNext() {
        if (this.selectedRow == null || this.employees.length - 1 === this.selectedRow) {
            this.selectedRow = 0;
            return;
        }
        this.selectedRow += 1;
    }

    onLastorFirst(condition: string) {
        if (condition === 'last') {
            this.selectedRow = this.employees.length - 1;
            return;
        }
        if (condition === 'first') {
            this.selectedRow = 0;
            return;
        }
    }

    onBack() {
        if (this.selectedRow == null) {
            this.selectedRow = 0;
            return;
        }
        if (this.selectedRow === 0) {
            this.selectedRow = this.employees.length - 1;
            return;
        }
        this.selectedRow -= 1;
    }
}