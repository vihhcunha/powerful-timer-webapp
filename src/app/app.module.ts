import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BaseService } from './services/base/base.service';
import { httpInterceptorProviders } from './services/interceptor/interceptor-provider';
import { LoaderInterceptor } from './services/interceptor/loader-interceptor';
import { LoaderService } from './utils/loader-service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimerService } from './services/timer.service';
import { AppLayoutComponent } from './components/_layouts/app-layout/app-layout.component';
import { BaseFormComponent } from './components/base/base-form/base-form.component';
import { ContentModalComponent } from './components/modals/content-modal.component';
import { SetupListComponent } from './components/setup/setup-list/setup-list.component';
import { AddEditTimerComponent } from './components/setup/add-edit-timer/add-edit-timer.component';
import { SecondsToDatePipe } from './pipes/secondsToDatePipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AppLayoutComponent,
    BaseFormComponent,
    SetupListComponent,
    AddEditTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    NgbModule,
    NgbToastModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SecondsToDatePipe,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [
    BaseService, 
    Title, 
    LoaderService, 
    TimerService,
    LoaderInterceptor, 
    DatePipe,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
