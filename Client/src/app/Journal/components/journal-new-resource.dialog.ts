import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { Resource } from '../models/resource.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">New Resource</h4>
      <button type="button" tabindex="-1" class="btn" (click)="activeModal.dismiss()">
        <fa-icon [icon]="faTimes"></fa-icon>
      </button>
    </div>
    <form class="modal-body" [formGroup]="resourceForm" (ngSubmit)="onSubmit()">
      <div class= "row pb-2">
        <label class="col-sm-3 col-form-label">Name</label>
        <div class="col-sm-9">
          <input class="py-1 w-100" formControlName="name" type="text" placeholder="Name">
          <div *ngIf="name.invalid && name.touched" class="invalid-feedback d-block">
            <label>This field is required</label>
          </div>
        </div>
      </div>
      <div class="row pb-2">
        <label class="col-sm-3 col-form-label">Description</label>
        <div class="col-sm-9">
          <input class="py-1 w-100" formControlName="description" type="text" placeholder="Description">
          <div *ngIf="description.invalid && description.touched" class="invalid-feedback d-block">
            <label>This field is required</label>
          </div>
        </div>
      </div>
      <div class="row pb-2">
        <label class="col-sm-3 col-form-label">Url</label>
        <div class="col-sm-9">
          <input class="py-1 w-100" formControlName="url" type="url" placeholder="https://www.example.com">
          <div *ngIf="url.invalid && url.touched" class="invalid-feedback d-block">
            <label>This field is required</label>
          </div>
        </div>
      </div>
      <div class="row pb-2">
        <label class="col-sm-3 col-form-label">Date</label>
        <div class="col-sm-9">
          <div class="d-flex w-100" style="position: relative;">
            <input type="text" class="form-control"
                   formControlName='dateCreated' ngbDatepicker (click)="picker.toggle()"
                   #input #picker="ngbDatepicker">
            <button type="button" class="btn btn-outline-primary ml-1" #button (click)="picker.toggle()">
              <fa-icon [icon]="faCalendar"></fa-icon>
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer mt-3">
        <button type="button" class="btn btn-outline-primary" (click)="activeModal.dismiss()">Cancel</button>
        <button type="submit" class="btn btn-primary" [disabled]="!resourceForm.valid">Submit</button>
      </div>
    </form>

  `,
  styles: []
})
export class ResourceDialog implements OnInit {
  faTimes = faTimes;
  faCalendar = faCalendar;
  urlValid = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  @Input() resource: Resource;

  resourceForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  get name() { return this.resourceForm.get('name'); }
  get description() { return this.resourceForm.get('description'); }
  get url() { return this.resourceForm.get('url'); }
  get dateCreated() { return this.resourceForm.get('dateCreated'); }

  ngOnInit(): void {

    console.log(this.resource);

    this.resource ??= {
      name: '',
      description: '',
      url: '',
      dateCreated: new Date(),
    };

    this.resourceForm = new FormGroup({
      name: new FormControl(this.resource.name, [Validators.required, Validators.maxLength(80)]),
      description: new FormControl(this.resource.description, [Validators.maxLength(240)]),
      url: new FormControl(this.resource.url, [Validators.required, Validators.pattern(this.urlValid)]),
      dateCreated: new FormControl(this.getFormattedNgbDate(this.resource.dateCreated), [Validators.required])
    });
  }

  onSubmit(): void {
    const resourceId = this.resource.id | 0;
    this.resource = <Resource>this.resourceForm.value;
    this.resource.dateCreated = this.getFormattedDate(this.dateCreated.value);
    if (resourceId) { this.resource.id = resourceId; }
    this.activeModal.close(this.resource);
  }

  getFormattedDate(date: NgbDate): Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  getFormattedNgbDate(date: Date): NgbDate {
    return new NgbDate(date.getFullYear(), date.getMonth(), date.getDay());
  }
}
