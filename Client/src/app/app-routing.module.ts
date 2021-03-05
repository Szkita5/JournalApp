import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalHomeComponent } from './journal/components/journal-home.component';
import { LoginComponent } from './journal/components/login.component';

const routes: Routes = [
  { path: 'journal', component: JournalHomeComponent },
  { path: 'login', component: LoginComponent},
  { path: '', component: JournalHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
