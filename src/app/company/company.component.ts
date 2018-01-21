import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../shared/message.service';
import { CompanyService } from './company.service';
import { last } from 'rxjs/operators/last';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

    company = new Object();

    constructor(private _companyService: CompanyService) {
    }

    ngOnInit() {
        this.getOurCompany();
    }

    getOurCompany() {
        this._companyService.getOurCompany()
            .subscribe(
            (response: any) => [(this.company = response)],
            (error) => console.log(error)
            );
    }
}
