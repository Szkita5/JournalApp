import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalHomeComponent } from './components/journal-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    JournalHomeComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ]
})
export class JournalModule { }
