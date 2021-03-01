import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Resource } from '../models/resource.model';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'journal-entry',
  template: `
    <div class="card container my-2">
      <div class="row">
        <img src="../../../assets/default_resource_img.png" class="card-image col-2 p-0" alt="...">
        <div class="card-body col-10">
          <h3 class="card-title">{{resource.name}}</h3>
          <p *ngIf="resource.description" class="card-text">{{resource.description}}</p>
          <p class="card-text">{{resource.url}}</p>
          <p class="card-text">{{resource.dateCreated}}</p>
          <button class="btn btn-outline-primary m-1" (click)="openResource(resource)">Open</button>
          <button class="btn btn-outline-primary m-1" (click)="editResource(resource)">
            <fa-icon [icon]="faEdit"></fa-icon>
          </button>
          <button class="btn btn-outline-danger m-1" (click)="deleteResource(resource)">
            <fa-icon [icon]="faTrashAlt"></fa-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-image {
      height: auto;
    }
  `]
})
export class JournalEntryComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  @Input() resource: Resource;
  @Output() deleteClicked = new EventEmitter<Resource>();
  @Output() editClicked = new EventEmitter<Resource>();

  constructor() { }

  ngOnInit(): void {
  }

  openResource(resource: Resource): void {
    window.open(resource.url);
  }

  editResource(resource: Resource): void {
    this.editClicked.emit(resource);
  }

  deleteResource(resource: Resource): void {
    this.deleteClicked.emit(resource);
  }
}
