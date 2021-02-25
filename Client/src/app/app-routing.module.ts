import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalHomeComponent } from './journal/components/journal-home.component';

const routes: Routes = [
  { path: 'journal', component: JournalHomeComponent },
  { path: '', component: JournalHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
