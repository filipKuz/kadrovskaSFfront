import { Component, OnInit,OnDestroy , ViewChild} from '@angular/core';
import { AnnualHolidayRegulationService } from './annualHolidayRegulation.service';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';
import { send } from 'q';
import { VacationReqService } from '../vacation-request/vacation-request.service';
import { IMyDateModel, NgxMyDatePickerDirective, INgxMyDpOptions } from 'ngx-mydatepicker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-annual-holiday-regulation',
  templateUrl: './annual-holiday-regulation.component.html',
  styleUrls: ['./annual-holiday-regulation.component.css']
})
export class AnnualHolidayRegulationComponent implements OnInit ,OnDestroy {

  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpE: NgxMyDatePickerDirective;
  @ViewChild('f') addVreqForm: NgForm;



  subscription: Subscription;
  AHRs = [];
  model: any = { date: { year: "2017", month: "1", day: "19" } };
  vacationRequests=[];
  mess: string = "22";
  ahrId: number = 0;
  showDialog = false;
  vreq = {
    "startDate": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
    "endDate": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
    "numOfDays": 0,
    "annualHolidayRegulationId": this.ahrId
  };

  businessYear: number = 2018;
  startDateVar: any;
  numOfDaysVar: number=1;
  daysToAddOrSubtract: number = 0;
  thisYear: Date = new Date;
  yearNum:number;


  constructor(private _AHRS: AnnualHolidayRegulationService,private _vacationReqSevice: VacationReqService, private _messageService: MessageService) {
    this.subscription = this._messageService.getMessage()
                                            .subscribe(message => 
                                                { this.mess = message.text,this.onGetAHRbyEmployeeId(this.mess);
                                                
                                                  }
                                              );
                                              
  }



  ngOnInit() {
    this.yearNum = this.thisYear.getFullYear();
  }



  onBYChange(){
    this.onGetAHRbyEmployeeId(this.mess)
  }

  setDaysToAddOrSubtract(days) {
    this.AHRs[0].numOfDays += Number(days);
  }

  onGetVReqbyAHRId(AHRId) {
    this._vacationReqSevice.getByAHR(AHRId)
      .subscribe(
      (response: any) => [(this.vacationRequests = response)],
      (error) => console.log(error)
      );
  }

  onCheckAHRID(){
    if(this.AHRs.length <  1){
      this.ahrId = 0
      this.businessYear = 2018;
      alert("Zaposleni nema resenje za gosinji odmor za odabranu godinu")
    }else{
      this.ahrId = this.AHRs[0].annualHolidayRegulationId
    }
  }

  
  transformFormattedDate(date:string) {
    var dateSpilt = date.split("-");
    this.model = {date : {year : Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
  }

  onGetAHRbyEmployeeId(employeeId) {
    this._AHRS.getAHRByEmployee(employeeId, this.businessYear)
      .subscribe(
      (response: any) => 
      [(this.AHRs = response,
        this.onCheckAHRID(),
        this.vreq.annualHolidayRegulationId=this.ahrId, 
        this.onGetVReqbyAHRId(this.ahrId)
        )], 
      (error) =>[console.log(error), this.vacationRequests=[]]
      );
  }

  onGetById(ahrId){
    this._AHRS.getById(ahrId)
    .subscribe(
      (response: any) =>
       [(this.AHRs = response, this.ahrId = this.AHRs[0].annualHolidayRegulationId)],
      (error) => console.log(error)
    );
  }

  sendMessage(message: string): void {
    // send message to subscribers via observable subject
    this._messageService.sendMessage(message);
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
        (response:any) => (this.onGetAHRbyEmployeeId(this.mess)),
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
        (response) => [(this.onGetAHRbyEmployeeId(this.mess))],
        (error) => console.log(error)
      )
    
  }
  
}

