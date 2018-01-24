import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { WorkPlaceService } from './work-place.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../shared/message.service';

@Component({
    selector: 'app-work-place',
    templateUrl: './work-place.component.html',
    styleUrls: ['./work-place.component.css']
})

export class WorkPlaceComponent implements OnInit {


    @ViewChild('f') addWorkPlaceForm: NgForm;
    @ViewChild('fe') editWorkPlaceForm: NgForm;


    workPlaces = [];
    workPlace = {
        "name": "",
        "coefficient": 1
    };

    workplaceForSend = {};

    name: string;
    coefficient: any;


    WorkPlaceCLicked: boolean = false;
    showDialog = false;
    showEditDialog = false;

    selectedWorkPlaceId = 0;
    actionForModal = "";


    selectedRow: number;
    setClickedRow: Function;


    constructor(private workPlaceService: WorkPlaceService,
        private _messageService: MessageService) {
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        }
    }


    ngOnInit() {
        this.onGet();
    }

    onPopulateJsonWorkPlace(
        name: string,
        coefficient: any,
    ) {
        this.workPlace.name = name;
        this.workPlace.coefficient = coefficient;
    }

    onNext() {
        if (this.selectedRow == null || this.workPlaces.length - 1 == this.selectedRow) {
            this.selectedRow = 0;
            return;
        }
        this.selectedRow += 1;
    }

    onLastorFirst(condition: string) {
        if (condition == "last") {
            this.selectedRow = this.workPlaces.length - 1;
            return;
        }
        if (condition == "first") {
            this.selectedRow = 0;
            return;
        }
    }

    onBack() {
        if (this.selectedRow == null) {
            this.selectedRow = 0;
            return;
        }
        if (this.selectedRow == 0) {
            this.selectedRow = this.workPlaces.length - 1;
            return;
        }
        this.selectedRow -= 1;
    }



    onGet() {
        this.workPlaceService.getAllWorkPlaces()
            .subscribe(
            (response: any) => (this.workPlaces = response,
                console.log(this.workPlaces)),
            (error) => console.log(error)
            );
    }

    onSubmit(action) {
        if (action === "add") {
            this.onPopulateJsonWorkPlace(this.name, this.coefficient);
            this.onPost();
            this.showDialog = !this.showDialog;
        } if (action === "edit") {
            this.onPopulateJsonWorkPlace(this.editWorkPlaceForm.value.workPlaceNameEdit, this.editWorkPlaceForm.value.workPlaceCoefficientEdit);
            this.onPut();
            this.showEditDialog = !this.showEditDialog;
            this.resetEditForm();
        }
    }

    resetForm() {
        this.addWorkPlaceForm.resetForm();
    }

    resetEditForm() {
        this.editWorkPlaceForm.resetForm();
    }


    onAddWorkPlace() {
        this.resetForm();
        this.showDialog = !this.showDialog;

    }


    onEditWorkPlace(id) {
        this.resetEditForm();
        this.selectedWorkPlaceId = id;
        this.onGetById(this.selectedWorkPlaceId);
        this.showEditDialog = !this.showEditDialog;

    }

    onGetById(id: number) {
        this.workPlaceService.getWorkPlaceById(id)
            .subscribe(
            (response: any) => (
                this.onPopulateJsonWorkPlace(
                    response.name,
                    response.coefficient,
                )),
            (error) => console.log(error)
            )
    }


    onDeleteWorkPlace(id) {
        this.workPlaceService.deleteWorkPlace(id).subscribe(
            (response: any) => (
                this.onGet()
            ),
            (error) => console.log(error)
        );


    }

    onPost() {
        let send = {
            name: this.workPlace.name,
            coefficient: Number(this.workPlace.coefficient)
        };
        this.workPlaceService.addWorkPlace(send)
            .subscribe(
            (response) => [this.workPlaces.push(response.json()), console.log(this.workPlaces)],
            (error) => console.log(error)
            );
    }

    onPut() {
        this.workPlaceService.editWorkPlace(this.workPlace, this.selectedWorkPlaceId)
            .subscribe(
            (response: any) => (
                this.onGet()
            ),
            (error) => console.log(error)
            );
    }

}






