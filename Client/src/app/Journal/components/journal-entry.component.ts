import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Resource } from '../models/resource.model';
import { faEdit, faTrashAlt, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'journal-entry',
  template: `
    <div class="container my-2">
      <div class="w-100 dropdown-header p-0">
        <h3 class="m-0">
          <button class="btn btn-link dropdown-button" (click)="collapse.toggle()" [attr.aria-expanded]="!isCollapsed"
                  aria-controls="collapseExample">
            <fa-icon [icon]="faChevronRight" *ngIf="isCollapsed"></fa-icon>
            <fa-icon [icon]="faChevronDown" *ngIf="!isCollapsed"></fa-icon>
          </button>
          {{resource.name}}
        </h3>
      </div>
      <div #collapse="ngbCollapse" [(ngbCollapse)]="isCollapsed">
        <div class="card">
          <div class="card-body row">
            <div class="mb-2">
              <label class="col-sm-2">Description</label>
              <label *ngIf="resource.description" class="col-sm-10">{{resource.description}}</label>
            </div>
            <div class="mb-2">
              <label class="col-sm-2">Source</label>
              <label *ngIf="resource.url" class="col-sm-10">{{resource.url}}</label>
            </div>
            <div class="mb-2">
              <label class="col-sm-2">Last visited</label>
              <label *ngIf="resource.dateCreated" class="col-sm-10">{{resource.dateCreated | date:'fullDate'}}</label>
            </div>
            <span class="d-flex justify-content-between">
              <button class="btn btn-outline-primary m-1" (click)="openResource(resource)">Open</button>
              <span>
                <button class="btn btn-outline-primary m-1" (click)="editResource(resource)">
                  <fa-icon [icon]="faEdit"></fa-icon>
                </button>
                <button class="btn btn-outline-danger m-1" (click)="deleteResource(resource)">
                  <fa-icon [icon]="faTrashAlt"></fa-icon>
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropdown-header {
      border: 1px solid lightgray;
      border-radius: 3px;
      background-color: lightblue;
      color: #333333;
    }
    .dropdown-button {
      width: 3rem;
    }
  `]
})
export class JournalEntryComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  @Input() resource: Resource;
  @Input() isCollapsed = true;
  @Output() deleteClicked = new EventEmitter<Resource>();
  @Output() editClicked = new EventEmitter<Resource>();
  @Output() openClicked = new EventEmitter<Resource>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.resource);
  }

  openResource(resource: Resource): void {
    this.openClicked.emit(resource);
  }

  editResource(resource: Resource): void {
    this.editClicked.emit(resource);
  }

  deleteResource(resource: Resource): void {
    this.deleteClicked.emit(resource);
  }
}
