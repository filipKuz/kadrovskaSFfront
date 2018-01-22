import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class NgbdPaginationAdvanced implements OnInit, OnDestroy {
    page = 1;
    collectionSize: Number = 0;
    subscription: Subscription;

    @Input() totalPages: number;

    @Output() emitPageNum = new EventEmitter<number>();

    constructor() {
        
    }

    onSelect(event:number) {
        this.page = event-1;
        this.onSelectPage(event-1);
    }

    onSelectPage(page: number) {
        this.emitPageNum.emit(page);
    }

    ngOnInit() {
       
    }
    ngOnDestroy() {
    }

}