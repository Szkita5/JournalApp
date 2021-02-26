import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Resource } from '../models/resource.model';

@Component({
  selector: 'journal-home',
  template: `
    <journal-header></journal-header>
    <div class="container">
      <journal-entry *ngFor="let resource of resources" [resource]="resource"></journal-entry>
    </div>
  `,
  styles: [``]
})
export class JournalHomeComponent implements OnInit {

  resources: Resource[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getResources().subscribe( data => {
      this.resources = data;
    });

    this.api.getResource(1).subscribe( data => {
      console.log('resource', data);
    });
  }

}
