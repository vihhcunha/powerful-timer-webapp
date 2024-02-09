import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/_layouts/app-layout/app-layout.component';
import { SetupListComponent } from './components/setup/setup-list/setup-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '', component: AppLayoutComponent, 
    children: 
    [
      { path: 'setup', component: SetupListComponent }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
