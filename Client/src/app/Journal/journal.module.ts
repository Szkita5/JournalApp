import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalHomeComponent } from './components/journal-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JournalHeaderComponent } from './components/journal-header.component';
import { JournalEntryComponent } from './components/journal-entry.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResourceDialog } from './components/journal-new-resource.dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    JournalHomeComponent,
    JournalHeaderComponent,
    JournalEntryComponent,
    ResourceDialog,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  entryComponents: [
    ResourceDialog,
  ]
})
export class JournalModule { }
