import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { VacationReqService } from './vacation-request.service';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { AnnualHolidayRegulationService } from '../annual-holiday-regulation/annualHolidayRegulation.service';
import { NgForm } from '@angular/forms';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.css']
})
export class VacationRequestComponent implements OnInit, OnDestroy {

  /*
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpE: NgxMyDatePickerDirective;
  @ViewChild('f') addEpqForm: NgForm;

  */
  subscription: Subscription;
  vacationRequests = [];
  mess: string = "22";
  model: any = { date: { year: "2017", month: "1", day: "19" } };
  clickedVReq;
  addVReq = false;

  vreq = {
        "startDate": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
        "endDate": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
        "numOfDays": "",
        "annualHolidayRegulationId": ""
      };

 
  constructor(private _vacationReqSevice: VacationReqService,
              private _messageService: MessageService,
              private _aHRService: AnnualHolidayRegulationService) {
    this.subscription = this._messageService.getMessage()
                                            .subscribe(message => 
                                                { this.mess = message.text, this.onGetVReqbyAHRId(message.text); this.vreq.annualHolidayRegulationId = message.text}
                                              );
                                              
  }

  ngOnInit() {
  }

  onGetVReqbyAHRId(AHRId) {
    this._vacationReqSevice.getById(AHRId)
      .subscribe(
      (response: any) => [(this.vacationRequests = response)],
      (error) => console.log(error)
      );
  }

  /*
  transformFormattedDate(date:string) {
    var dateSpilt = date.split("-");
    this.model = {date : {year : Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
  }
*/

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

/*
  resetForm() {
    this.addVReq.resetForm();
  }


  onSubmit(action) {
    if (action=="add") {
      this.onCreateVReq();
      this.addVReq = !this.addVReq;
    }
  }
/*
  onAddButton() {
    this.resetForm();
    this.addVReq = !this.addVReq; 
  }
  
  onDateChanged(event: IMyDateModel): void {
    this.vreq.startDate = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
  }



  onCreateVReq() {
    console.log(this.vreq);
    this._vacationReqSevice.postVReq(this.vreq)
      .subscribe(
        (response:any) => (this.vacationRequests.push(response)),
        (error) => console.log(error)
      )
    }


  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-m-d',
    maxYear: new Date().getFullYear()
  };

  onDeleteVreq(id) {
    this._vacationReqSevice.deleteVReq(id)
      .subscribe(
        (response: any) => (this.onGetVReqbyAHRId(id)),
        (error) => console.log(error)
      )
  }

  */
}
