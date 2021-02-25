import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'journal-home',
  template: `
    <p>works lul</p>
  `,
  styles: [``]
})
export class JournalHomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getHeroes();

    this.api.getHero(1);
  }

}
