import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'journal-home',
  template: `
    <journal-header></journal-header>
  `,
  styles: [``]
})
export class JournalHomeComponent implements OnInit {

  @Input() bannerTitle = 'asd';
  @Input() bannerSubtitle;

  scrolled = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getResources();

    this.api.getHero(1);
  }

}
