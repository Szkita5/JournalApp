import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Resource } from '../models/resource.model';
import { NewResourceDialog } from './journal-new-resource.dialog';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'journal-home',
  template: `
    <journal-header></journal-header>
    <div class="container">
      <journal-entry *ngFor="let resource of resources"
                     [resource]="resource"
                     (editClicked)="editResource($event)"
                     (deleteClicked)="deleteResource($event)">
      </journal-entry>
      <button class="btn btn-outline-primary" (click)="addResource()">New resource</button>
    </div>
  `,
  styles: [``]
})
export class JournalHomeComponent implements OnInit {

  resources: Resource[];

  constructor(private api: ApiService, private dialog: DialogService) { }

  ngOnInit(): void {
    this.getResources();
  }

  getResources(): void {
    this.api.getResources().subscribe( data => {
      console.log(data);
      this.resources = data;
    });
  }

  editResource($event: Resource): void {
    const modalRef = this.dialog.openDialog(NewResourceDialog);
    const instance = modalRef.componentInstance;
    instance.resource = $event;
    modalRef.result.then( result => {
      console.log(result);
    });
  }

  deleteResource($event: Resource): void {
    this.api.deleteResource($event.id).subscribe( response => console.log(response));
    const resIndex = this.resources.findIndex(resource => resource === $event);
    if (resIndex > 0) {
      this.resources.splice(resIndex, 1);
    }
  }

  addResource() {
    const modalRef = this.dialog.openDialog(NewResourceDialog);
    modalRef.result.then( result => {
      console.log(result);
      this.api.postResource(result);
    });
  }
}
