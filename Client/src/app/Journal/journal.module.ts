import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalHomeComponent } from './components/journal-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JournalHeaderComponent } from './components/journal-header.component';
import { JournalEntryComponent } from './components/journal-entry.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewResourceDialog } from './components/journal-new-resource.dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JournalHomeComponent,
    JournalHeaderComponent,
    JournalEntryComponent,
    NewResourceDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    NewResourceDialog,
  ]
})
export class JournalModule { }
