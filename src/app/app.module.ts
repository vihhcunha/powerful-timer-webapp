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

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
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
    ReactiveFormsModule
  ],
  providers: [
    BaseService, 
    Title, 
    LoaderService, 
    LoaderInterceptor, 
    DatePipe,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
