import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Resource } from '../models/resource.model';
import { ResourceDialog } from './journal-new-resource.dialog';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'journal-home',
  template: `
    <journal-header (search)="searchResources($event)"></journal-header>
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
      data.forEach( resource => resource.dateCreated = new Date(resource.dateCreated));
      this.resources = data;
    });
  }

  editResource($event: Resource): void {
    const modalRef = this.dialog.openDialog(ResourceDialog);
    const instance = modalRef.componentInstance;
    instance.resource = $event;
    modalRef.result.then( result => {
      console.log('before', result);
      this.api.updateResource(result).subscribe(res => {
        res.dateCreated = new Date(res.dateCreated);
        const index = this.resources.findIndex(resource => resource.id === res.id);
        this.resources[index] = res;
      });
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
    const modalRef = this.dialog.openDialog(ResourceDialog);
    modalRef.result.then( result => {
      this.api.addResource(result).subscribe(res => {
        res.dateCreated = new Date(res.dateCreated);
        this.resources.push(res);
      });
    });
  }

  searchResources(searchString: string) {
    this.api.searchResources(searchString).subscribe(res => {
      res.forEach( resource => resource.dateCreated = new Date(resource.dateCreated));
      this.resources = res;
    });
  }
}
