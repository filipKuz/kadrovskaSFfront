import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { VacationReqService } from './vacation-request.service';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { AnnualHolidayRegulationService } from '../annual-holiday-regulation/annualHolidayRegulation.service';
import { NgForm } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { AnnualHolidayRegulationComponent } from '../annual-holiday-regulation/annual-holiday-regulation.component';
import { FunctionCall } from '@angular/compiler';


@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.css']
})
export class VacationRequestComponent implements OnInit, OnDestroy {

  
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpE: NgxMyDatePickerDirective;
  @ViewChild('f') addVreqForm: NgForm;

  daysToAddOrSubtract: number = 0;

  @Output() emitDays = new EventEmitter<number>();


  onEmitDays() {
      this.emitDays.emit(this.daysToAddOrSubtract);
  }

  
  subscription: Subscription;
  vacationRequests = [];
  mess: string = "22";
  model: any = { date: { year: "2017", month: "1", day: "19" } };
  clickedVReq;
  showDialog = false;
  startDateVar: any;
  numOfDaysVar: number=1;
  @Input() ahrId: number;
  

  vreq = {
        "startDate": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
        "endDate": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
        "numOfDays": 0,
        "annualHolidayRegulationId": this.ahrId
      };

 
  constructor(private _vacationReqSevice: VacationReqService,
              private _messageService: MessageService,
              private _aHRService: AnnualHolidayRegulationService) {
    this.subscription = this._messageService.getMessage()
                                            .subscribe(message => 
                                                { this.mess = message.text,
                                                  this.onGetVReqbyAHRId(message.text),
                                                  this.vreq.annualHolidayRegulationId = message.text}
                                              );
                                              
  }

  ngOnInit() {
    this.onGetVReqbyAHRId(this.ahrId);
  }

  onGetVReqbyAHRId(AHRId) {
    this._vacationReqSevice.getByAHR(AHRId)
      .subscribe(
      (response: any) => [(this.vacationRequests = response)],
      (error) => console.log(error)
      );
  }

  
  transformFormattedDate(date:string) {
    var dateSpilt = date.split("-");
    this.model = {date : {year : Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }


  resetForm() {
    this.addVreqForm.resetForm();
  }


  onSubmit(action) {
    if (action=="add") {
      this.onCreateVReq();
      this.showDialog = !this.showDialog;
    }
  }

  onAddVReq() {
    this.resetForm();
    this.showDialog = !this.showDialog; 
  }
  
  onDateChanged(event: IMyDateModel): void {
    this.vreq.startDate = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
  }

  onPopulateJsonVReq(
    startDate: any,
    numOfDays:number,
    ) {
    this.vreq.startDate = startDate;
    this.vreq.numOfDays = numOfDays;
  }

  onCreateVReq() {
    this.onPopulateJsonVReq(this.startDateVar.formatted, this.numOfDaysVar)
    this._vacationReqSevice.postVReq(this.vreq)
      .subscribe(
        (response:any) => (this.vacationRequests.push(response), this.daysToAddOrSubtract = -Number(response.numOfDays), this.onEmitDays()),
        (error) =>(
        alert("Nemate toliko slobodnih dana"),
        console.log(error)
        )
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
        (response) => [(this.onGetVReqbyAHRId(this.ahrId)), this.daysToAddOrSubtract = response.headers.get("daysToAdd"), this.onEmitDays()],
        (error) => console.log(error)
      )
  } 

  
}