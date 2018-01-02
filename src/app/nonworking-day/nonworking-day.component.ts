import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NonworkingDaysService } from './nonworkingDayService';
import { NgForm } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-nonworking-day',
  templateUrl: './nonworking-day.component.html',
  styleUrls: ['./nonworking-day.component.css']
})
export class NonworkingDayComponent implements OnInit {

  @ViewChild('f') addNonworkingDayForm: NgForm;
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;


  nonworkingDays=[];
  newNonworkingDay = {
    "nonworkingDayDescription": "",
    "nonworkingDayDate": "",
};

EPQclicked: boolean = false; 
showDialog = false;

selectedRow: Number;
setClickedRow: Function;


  constructor(private nonWorkingDayService: NonworkingDaysService, 
              private _messageService: MessageService) { 
    this.setClickedRow = function(index) {
    this.selectedRow = index;
    }
  }

  ngOnInit() {
    this.onGet();
  }

  onGet() {
    this.nonWorkingDayService.getNonworkingDays()
      .subscribe(
        (response:any) => (this.nonworkingDays = response,
          console.log(this.nonworkingDays)),
        (error) => console.log(error)
      );
  }

  
  resetForm() {
    this.addNonworkingDayForm.resetForm();
  }

  onSubmit() {
    this.newNonworkingDay.nonworkingDayDescription = this.addNonworkingDayForm.value.nonworkingDayDescription;
    this.newNonworkingDay.nonworkingDayDate = this.addNonworkingDayForm.value.nonworkingDayDate.formatted;
    console.log(this.newNonworkingDay);
    this.onPost();
    this.resetForm();
    this.showDialog = !this.showDialog;
  }

  onPost() {
    this.nonWorkingDayService.addNonworkingDay(this.newNonworkingDay)
      .subscribe(
        (response) => [this.nonworkingDays.push(response.json()), console.log(this.nonworkingDays)],
        (error) => console.log(error)
      );
  }

  setActive() {
    this.EPQclicked = true;
  }
  sendMessage(message:string): void {
    // send message to subscribers via observable subject
    this._messageService.sendMessage(message);
  }

  clearMessage(): void {
    // clear message
    this._messageService.clearMessage();
  }

  //for datepicker
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-m-d',
  };

}
