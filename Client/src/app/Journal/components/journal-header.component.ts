import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'journal-header',
  template: `
    <header class="bg-dark" [style.min-height]="height">
      <div class="container">
        <nav class="navbar navbar-expand-md sticky-md-top navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand">Journal</a>
            <div class="collapse navbar-collapse">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page">Resources</a>
                <a class="nav-link">Features</a>
                <a class="nav-link">New resource</a>
              </div>
            </div>
              <form class="form-inline">
                <span class="row m-0">
                  <input class="form-control col-sm" type="search" placeholder="Search" #input>
                </span>
              </form>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
  `]
})
export class JournalHeaderComponent implements AfterViewInit {
  faSearch = faSearch;

  @Input() height = '3rem';
  @Output() search = new EventEmitter<string>();
  @Output() newResource = new EventEmitter();

  @ViewChild('input', {static: true}) input: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup').pipe (
      filter(Boolean),
      debounceTime(150),
      distinctUntilChanged()
    ).subscribe(() => {
      this.search.emit(this.input.nativeElement.value);
    });
  }

}
