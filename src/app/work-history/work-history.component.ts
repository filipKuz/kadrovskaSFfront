import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { NgForm } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { WorkHistoryService } from './work-history.service';
import { EmployeeService } from '../employee/employee.service';
import { WorkPlaceService } from '../work-place/work-place.service';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.css']
})
export class WorkHistoryComponent implements OnInit, OnDestroy {
  employeeId: any;

  @ViewChild('dpCreate') ngxdpCreate: NgxMyDatePickerDirective;
  @ViewChild('dpECreate') ngxdpECreate: NgxMyDatePickerDirective;

  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpE: NgxMyDatePickerDirective;

  @ViewChild('f') addWorkHistoryForm: NgForm;
  @ViewChild('fE') editWorkHistoryForm: NgForm;

  subscription: Subscription;
  workHistoriesEmpl = [];
  mess = '22';
  startDate: any = { date: { year: "2017", month: "1", day: "19" } }
  endDate: any = null;


  workPlaces = [];


  workPlace = {
    "name": "",
    "coefficient": 1
  };

  data = { 'Employee': {}, 'workPlaceId': 0 };


  clickedWorkHistoryid;

  addWorkHistory = false;
  editWorkHistory = false;

  workHistory = {
    "previousCompany": "",
    "startDate": this.startDate.date.year + "-" + this.startDate.date.month + "-" + this.startDate.date.day,
    "endDate": '',
    //"endDate": this.endDate.date.year + "-" + this.endDate.date.month + "-" + this.endDate.date.day,    
    "employeeId": 0,
    "workPlaceId": 0
  };

  //workHostories = []
  constructor(private _workPlaceService: WorkPlaceService,
    private EmployeeService: EmployeeService,
    private workHistoryService: WorkHistoryService,
    private _messageService: MessageService) {
    this.subscription = this._messageService.getMessage()
      .subscribe(message => {
        this.employeeId = message.text;
        this.mess = message.text, this.onGetWorkHistoryEmployeeId(message.text);
      }
      );
  }


  ngOnInit() {
    this.onWorkHistoryTable();
    this.onPopulateDrowDownWorkPlaces();
  }



  onGetWorkHistoryEmployeeId(employeeId) {
    this.workHistoryService.getByEmployee(employeeId)
      .subscribe(
      response => {
        this.workHistoriesEmpl = response;
        console.log(this.workHistoriesEmpl);
      },
      (error) => console.log(error)
      );
  }


  onAddButton() {
    this.resetForm();
    this.addWorkHistory = !this.addWorkHistory;

  }

  onWorkHistoryTable() {
    this.workHistoryService.getAllWorkHistories()
      .subscribe(
      response => {
        this.workHistoriesEmpl = response;
        console.log(this.workHistoriesEmpl);
      },
      (error) => console.log(error)
      )
  }

  transformFormattedDate(date: string, type) {
    if (date != null) {
      var dateSpilt = date.split("-");
      if (type == 1) {
        this.startDate = { date: { year: Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
      } else if (type == 2) {
        this.endDate = { date: { year: Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
      }
    } else {
      if (type == 1) {
        this.startDate = { date: null };
      } else if (type == 2) {
        this.endDate = { date: null };
      }
    }
  }


  onEditButton(id) {
    this.clickedWorkHistoryid = id;
    this.editWorkHistory = !this.editWorkHistory;
    this.onGetWorkHistorybyId(id);
  }

  onPopulateWorkHistry(previousCompany) {
    this.workHistory = previousCompany;
  }


  onGetWorkHistorybyId(id) {
    this.workHistoryService.getWorkHistoryById(id)
      .subscribe(
      (response: any) => [this.onPopulateWorkHistry(response),
      this.transformFormattedDate(response.startDate, 1),
      this.transformFormattedDate(response.endDate, 2), console.log(response)],
      (error) => console.log(error)
      );
  }

  resetForm() {
    this.addWorkHistoryForm.resetForm();
  }

  resetEditForm() {
    this.editWorkHistoryForm.resetForm();
  }


  onDateChanged(event: IMyDateModel, whichChanged): void {
    console.log(whichChanged);
    if (whichChanged == 1) {
      this.workHistory.startDate = event.date.year + "-" + event.date.month + "-" + event.date.day;
    } else if (whichChanged == 2) {
      this.workHistory.endDate = event.date.year + "-" + event.date.month + "-" + event.date.day;
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onSubmit(action: string) {
    if (action == "add") {
      this.onCreateWorkHistory();
      this.addWorkHistory = !this.addWorkHistory;
    }
    if (action == "edit") {
      this.onEditButton(this.clickedWorkHistoryid);
      this.onPutWorkHistory();
      this.resetForm();
    }
  }


  onCreateWorkHistory() {
    this.workHistory.employeeId = this.employeeId;
    this.workHistory.workPlaceId = this.addWorkHistoryForm.value.workPlaceId;
    this.workHistoryService.newWorkHistory(this.workHistory)
      .subscribe( 
      (response: any) => {
        console.log(response);
        this.workHistoriesEmpl.push(response);
      },
      (error) => console.log(error)
      )
  }

  onEditWorkHistory() {
    this.workHistoryService.editWorkHistory(this.workHistory, this.clickedWorkHistoryid)
      .subscribe(
      (response) => (this.onGetWorkHistoryEmployeeId(this.mess)),
      (error) => console.log(error)
      )
  }

  onPutWorkHistory() {
    this.workHistoryService.editWorkHistory(this.workHistory, this.clickedWorkHistoryid)
      .subscribe(
      (response) => (this.onGetWorkHistoryEmployeeId(this.mess)),
      (error) => console.log(error)
      )
  }

  onDeleteWorkHistory(id) {
    this.workHistoryService.deleteWorkHistory(id)
      .subscribe(
      (response: any) => (this.onGetWorkHistoryEmployeeId(id)),
      (error) => console.log(error)
      )
  }

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-m-d',
    maxYear: new Date().getFullYear()
  };


  onPopulateDrowDownWorkPlaces() {
    this._workPlaceService.getAllWorkPlaces().
      subscribe(
      (response: any) => (this.workPlaces = response),
      (error) => (console.log(error))
      );
  }


}