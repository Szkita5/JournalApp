import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalHomeComponent } from './components/journal-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JournalHeaderComponent } from './components/journal-header.component';



@NgModule({
  declarations: [
    JournalHomeComponent,
    JournalHeaderComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ]
})
export class JournalModule { }
