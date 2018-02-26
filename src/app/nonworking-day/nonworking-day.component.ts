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
  @ViewChild('fe') editNonworkingDayForm: NgForm;
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpEditModal: NgxMyDatePickerDirective;



  model: any = { date: { year: "2018", month: "1", day: "19" } };
  nonworkingDays=[];
  nonworkingDay = {
    "nonworkingDayDescription":"",
    "nonworkingDayDate": this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day,
};

nwdDateVar: any;
nwdDesVar: string;

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
          response.nonworkingDayDescription,
          response.nonworkingDayDate,
        )),
      (error) => console.log(error)
      )
  }

  onPopulateJsonNWD(
    nonworkingDayDescription: string,
    nonworkingDayDate: any,
    ) {
    this.nonworkingDay.nonworkingDayDescription = nonworkingDayDescription;
    this.nonworkingDay.nonworkingDayDate = nonworkingDayDate;
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

  onDateChanged(event: IMyDateModel): void {
    this.nonworkingDay.nonworkingDayDate = this.model.date.year + "-" + this.model.date.month + "-" + this.model.date.day;
  }


  

  onSubmit(action) {
    if (action === "add") {
      this.onPopulateJsonNWD(this.nwdDesVar, this.nwdDateVar.formatted);
      this.onPost();
      this.showDialog = !this.showDialog;
    }if (action === "edit") {
      this.onPopulateJsonNWD(this.editNonworkingDayForm.value.workPlaceNameEdit, this.editNonworkingDayForm.value.workPlaceCoefficientEdit);
      this.onPut();
      this.showEditDialog = !this.showEditDialog;
      this.resetEditForm();
    }
  }


  onAddNonworkingDay(){
    this.resetForm();
    this.showDialog = !this.showDialog;
  }

  onEditNonworkingDay(id) {
    this.resetEditForm();
    this.selectedNWDId= id;
    this.onGetById(this.selectedNWDId);
    this.showEditDialog = !this.showEditDialog;
  }


  onDeleteNWD(id) {
    this.nonWorkingDayService.deleteNWD(id).subscribe(
      (response: any) => (
          this.onGet()
      ),
      (error) => console.log(error)
      );
  }

  onPost() {
    this.nonWorkingDayService.addNonworkingDay(this.nonworkingDay)
      .subscribe(
        (response) => [this.nonworkingDays.push(response.json()), console.log(this.nonworkingDays)],
        (error) => console.log(error)
      );
  }

  onPut() {
    this.nonWorkingDayService.editNWD(this.nonworkingDay, this.selectedNWDId)
      .subscribe(
      (response: any) => (
          this.onGet()
      ),
      (error) => console.log(error)
      );
  }

  transformFormattedDate(date:string) {
    var dateSpilt = date.split("-");
    this.model = {date : {year : Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
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
