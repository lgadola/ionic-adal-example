import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public authContext: AuthenticationContext;

  constructor(public navCtrl: NavController, private msAdal: MSAdal) {
    let authContext = this.msAdal.createAuthenticationContext('https://login.windows.net/79f641ca-5bdb-49ea-b795-8fea5279e716');
  }

  ngOnInit(): void {
    this.authContext.acquireTokenAsync('https://graph.windows.net', 'd017633c-c807-4730-8c6e-f4af6f58b68d', 'http://AngularAdalConnect')
      .then((authResponse: AuthenticationResult) => {
        console.log('Token is', authResponse.accessToken);
        console.log('Token will expire on', authResponse.expiresOn);
      })
      .catch((e: any) => console.log('Authentication failed', e));
  }

  public isLoggedIn(): boolean {
    return false;
  }

}
