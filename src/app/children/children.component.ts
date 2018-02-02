import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ChildrenService } from './children.service';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';
import { IMyDateModel, NgxMyDatePickerDirective, INgxMyDpOptions } from 'ngx-mydatepicker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnDestroy {

  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('dpE') ngxdpE: NgxMyDatePickerDirective;
  @ViewChild('f') addChildForm: NgForm;
  @ViewChild('fE') editChildForm: NgForm;
  subscription: Subscription;
  children = [];
  message = '';
  defaultSex = 'M';
  model: any = { date: { year: '2018', month: '1', day: '1' } };

  clickedChildId;
  addChild = false;
  editChild = false;

  child = {
    'employeeChildId': '',
    'birthDate': this.model.date.year + '-' + this.model.date.month + '-' + this.model.date.day,
    'name': '',
    'lastName': '',
    'sex': '',
    'employeeId': ''
  };

  constructor(private _childrenService: ChildrenService, private _messageService: MessageService) {
    this.subscription = this._messageService.getMessage()
      .subscribe(message => {
        this.message = message.text,
          this.onGetChildrenByEmployeeId(message.text); this.child.employeeId = message.text;
      }
      );
  }

  onGetChildrenByEmployeeId(employeeId) {
    this._childrenService.getChildrenByEmployee(employeeId)
      .subscribe(
      (response: any) => [(this.children = response)],
      (error) => console.log(error)
      );
  }

  transformFormattedDate(date: string) {
    const dateSpilt = date.split('-');
    this.model = { date: { year: Number(dateSpilt[0]), month: Number(dateSpilt[1]), day: Number(dateSpilt[2]) } };
  }

  onPopulateChild(name: string, lastName: string, sex: string) {
    this.child.name = name;
    this.child.lastName = lastName;
    this.child.sex = sex;
  }

  onGetChildById(id) {
    this._childrenService.getChildById(id)
      .subscribe(
      (response: any) => [this.onPopulateChild(response.name, response.lastName, response.sex),
      this.transformFormattedDate(response.birthDate)],
      (error) => console.log(error)
      );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  resetForm() {
    this.addChildForm.resetForm();
  }

  resetEditForm() {
    this.editChildForm.resetForm();
  }

  onSubmit(action: string) {
    if (action === 'add') {
      this.onCreateChild();
      this.addChild = !this.addChild;
    }
    if (action === 'edit') {
      this.onEditButton(this.clickedChildId);
      this.onEditChild();
    }
  }

  onAddButton() {
    this.resetForm();
    this.addChild = !this.addChild;
  }

  onEditButton(id) {
    this.clickedChildId = id;
    this.editChild = !this.editChild;
    this.onGetChildById(id);
  }

  onDateChanged(event: IMyDateModel): void {
    this.child.birthDate = event.date.year + '-' + event.date.month + '-' + event.date.day;
  }

  onCreateChild() {
    this._childrenService.addChild(this.child)
      .subscribe(
      (response: any) => (this.children.push(response)),
      (error) => console.log(error)
      );
  }

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-m-d',
    maxYear: new Date().getFullYear()
  };

  onDeleteChild(id) {
    this._childrenService.deleteChild(id)
      .subscribe(
      (response: any) => (this.onGetChildrenByEmployeeId(id)),
      (error) => console.log(error)
      );
  }

  onEditChild() {
    this._childrenService.editChild(this.child, this.clickedChildId)
      .subscribe(
      (response) => (this.onGetChildrenByEmployeeId(this.message)),
      (error) => console.log(error)
      );
  }

}
