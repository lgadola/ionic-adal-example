import { BrowserModule } from '@angular/platform-browser';
import {
  // APP_INITIALIZER,
  ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MSAdal } from '@ionic-native/ms-adal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { InterceptorModule } from '../providers/interceptor/interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ConfigurationService } from "ionic-configuration-service";
import { GraphServiceProvider } from '../providers/graph-service/graph-service';

// clash with Interceptor module
/* export function loadConfiguration(configurationService: ConfigurationService): () => Promise<void> {
  return () => configurationService.load("/assets/settings.json");
} */

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MSAdal,
    AuthServiceProvider,
    InAppBrowser,
    InterceptorModule,
    ConfigurationService,
/*     {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationService],
      multi: true
    }, */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorModule,
      multi: true
    },
    GraphServiceProvider
  ]
})
export class AppModule { }


