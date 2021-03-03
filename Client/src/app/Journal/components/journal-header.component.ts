import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

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
                <a class="nav-link active" aria-current="page" [routerLink]="'/journal/'">Resources</a>
                <a class="nav-link">Features</a>
                <a class="nav-link">New resource</a>
              </div>
            </div>
            <form class="form-inline">
              <span class="row mx-2">
                <input class="form-control col-sm" type="search" placeholder="Search" #input>
              </span>
            </form>
            <span class="ml-2">
              <button *ngIf="!getCurrentUser().token" class="btn btn-primary ml-2" [routerLink]="'/login/'">
                Login
              </button>
              <div *ngIf="getCurrentUser().token" ngbDropdown class="d-inline-block">
                <button class="btn btn-secondary" id="dropdownBasic1" ngbDropdownToggle>{{getCurrentUser().username}}</button>
                <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
                  <button ngbDropdownItem (click)="logout()">Logout</button>
                </div>
              </div>
            </span>
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

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup').pipe (
      filter(Boolean),
      debounceTime(150),
      distinctUntilChanged()
    ).subscribe(() => {
      this.search.emit(this.input.nativeElement.value);
    });

    this.getCurrentUser();
  }

  getCurrentUser(): User {
    return this.auth.getCurrentUser();
  }

  logout(): void {
    this.auth.logout();
  }
}
