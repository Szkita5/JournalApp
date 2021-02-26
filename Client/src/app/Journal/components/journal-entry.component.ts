import { Component, Input, OnInit } from '@angular/core';
import { Resource } from '../models/resource.model';

@Component({
  selector: 'journal-entry',
  template: `
    <div class="card container my-2">
      <div class="row">
        <img src="../assets/resource_default_img.png" class="card-image col-2 p-0" alt="...">
        <div class="card-body col-10">
          <h3 class="card-title">{{resource.name}}</h3>
          <p *ngIf="resource.description" class="card-text">{{resource.description}}</p>
          <p class="card-text">{{resource.url}}</p>
          <p class="card-text">{{resource.dateCreated}}</p>
          <button class="btn btn-primary" (click)="openResource(resource)">OPEN</button>
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
  @Input() resource: Resource;

  constructor() { }

  ngOnInit(): void {
  }

  openResource(resource: Resource) {
    window.open(resource.url);
  }
}
