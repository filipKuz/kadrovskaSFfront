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
  @ViewChild('fE') editNonworkingDayForm: NgForm;
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpEditModal: NgxMyDatePickerDirective;


  nonworkingDays=[];
  newNonworkingDay = {
    "nonworkingDayDescription": "",
    "nonworkingDayDate": "",
};

EPQclicked: boolean = false; 
showDialog = false;
showEditDialog = false;
selectedNWDId = 0;
actionForModal = "";
transormedDate: any = {};

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

  onGetById(id: number) {
    this.nonWorkingDayService.getNonworkingDayById(id)
      .subscribe(
      (response: any) => (this.transformFormattedDate(response.nonworkingDayDate),
        this.onPopulateJsonNWD(
        response.nonworkingDayDate,
        response.nonworkingDayDescription,
        )),
      (error) => console.log(error)
      )
  }

  onPopulateJsonNWD(
    nonworkingDayDate: string,
    nonworkingDayDescription: string,
    ) {
    this.newNonworkingDay.nonworkingDayDate = nonworkingDayDate;
    this.newNonworkingDay.nonworkingDayDescription = nonworkingDayDescription;
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

  resetEditForm() {
    this.editNonworkingDayForm.resetForm();
  }

  onSubmit() {
    this.newNonworkingDay.nonworkingDayDescription = this.addNonworkingDayForm.value.nonworkingDayDescription;
    this.newNonworkingDay.nonworkingDayDate = this.addNonworkingDayForm.value.nonworkingDayDate.formatted;
    console.log(this.newNonworkingDay);
    this.onPost();
    this.resetForm();
    this.showDialog = !this.showDialog;
  }



  onEditNonworkingDay(id) {
    this.resetEditForm();
    this.selectedNWDId= id;
    this.actionForModal = "edit";
    this.onGetById(this.selectedNWDId);
    this.showEditDialog = !this.showEditDialog;
  }

  onPost() {
    this.nonWorkingDayService.addNonworkingDay(this.newNonworkingDay)
      .subscribe(
        (response) => [this.nonworkingDays.push(response.json()), console.log(this.nonworkingDays)],
        (error) => console.log(error)
      );
  }

  onPut() {
    this.nonWorkingDayService.editNWD(this.newNonworkingDay, this.selectedNWDId)
      .subscribe(
      (response: any) => (
          this.onGet()
      ),
      (error) => console.log(error)
      );
  }

  transformFormattedDate(date:string) {
    var dateSpilt = date.split("-");
    this.transormedDate = {date : {year : Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
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
