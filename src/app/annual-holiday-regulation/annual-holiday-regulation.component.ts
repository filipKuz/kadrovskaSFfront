import { Component, OnInit,OnDestroy } from '@angular/core';
import { AnnualHolidayRegulationService } from './annualHolidayRegulation.service';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-annual-holiday-regulation',
  templateUrl: './annual-holiday-regulation.component.html',
  styleUrls: ['./annual-holiday-regulation.component.css']
})
export class AnnualHolidayRegulationComponent implements OnInit ,OnDestroy {

  
  subscription: Subscription;
  AHRs = [];
  mess: string = "22";

  constructor(private _AHRS: AnnualHolidayRegulationService, private _messageService: MessageService) {
    this.subscription = this._messageService.getMessage()
                                            .subscribe(message => 
                                                { this.mess = message.text, console.log(this.mess + "  " + message.text), this.onGetAHRbyEmployeeId(message.text); }
                                              );
                                              
  }


  ngOnInit() {
  }

  onGetAHRbyEmployeeId(employeeId) {
    this._AHRS.getAHRByEmployee(employeeId)
      .subscribe(
      (response: any) => [(this.AHR = response)],
      (error) => console.log(error)
      );
  }


  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
}

