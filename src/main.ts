/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  return environment.apiUrl; 
}

export function getWebSocketBaseUrl() {
  return environment.webSocketUrl; 
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'BASE_URL_WEB_SOCKET', useFactory: getWebSocketBaseUrl, deps: [] }
];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
