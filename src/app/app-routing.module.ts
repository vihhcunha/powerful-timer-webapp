import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/_layouts/app-layout/app-layout.component';
import { SetupListComponent } from './components/setup/setup-list/setup-list.component';
import { TimerControlComponent } from './components/timer/timer-control/timer-control.component';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, 
    children: 
    [
      { path: 'setup', component: SetupListComponent },
      { path: '', component: TimerControlComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
