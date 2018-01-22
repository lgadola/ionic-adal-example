import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  public UserId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private msAdal: MSAdal) {
  }
  ngOnInit() {
  }
  ionViewDidLoad() {
    console.debug('ionViewDidLoad HomePage');
  }
  public SignIn() {
    let authContext: AuthenticationContext = this.msAdal.createAuthenticationContext('https://login.windows.net/79f641ca-5bdb-49ea-b795-8fea5279e716');
    authContext.acquireTokenAsync('https://graph.windows.net',
      '89b27a0d-e1c9-4ac4-bba5-4c8f42c029d0',
      'http://mydirectorysearcherapp/', null, null)
      .then((authResponse: AuthenticationResult) => {
        console.debug('Token is', authResponse.accessToken);
        console.debug('Token will expire on', authResponse.expiresOn);
        this.UserId = authResponse.userInfo.userId;
      })
      .catch((e: any) => console.log('Authentication failed', e));
      }
}
