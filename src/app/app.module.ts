import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AdalService } from 'ng2-adal/dist/core';
import { AdalConfigService } from './_services/adal-config.service';
import { AuthService } from './_services/auth.service';

import { Unauthorized } from '../pages/unauthorized/unauthorized';
import { AuthCallback } from '../pages/auth-callback/auth-callback';
import { Restricted } from '../pages/restricted/restricted';

//Imports the entire DevExtreme
//import { DevExtremeModule } from 'devextreme-angular'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Unauthorized,
    AuthCallback,
    Restricted
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
//    DevExtremeModule
   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Unauthorized,
    AuthCallback,
    Restricted
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AdalConfigService,
    AdalService
  ]
})
export class AppModule {}
