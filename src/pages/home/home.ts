import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthServiceProvider, LoginInfo } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  platformList: string = '';
  isApp: boolean = true;
  LoginInfo: Promise<LoginInfo> | null;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, private authService: AuthServiceProvider) {
    let platforms = this.platform.platforms();

    this.platformList = platforms.join(', ');

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    }
  }
  ngOnInit() {
  }
  ionViewDidLoad() {
    console.debug('ionViewDidLoad HomePage');
  }
  public SignIn() {
    if (!this.isApp) {
      // todo: implement browser login
      alert("login on browser not implemented");
      return;
    }
    this.LoginInfo = this.authService.signIn();
  }
  public SignOut(){
    if (!this.isApp) {
      // todo: implement browser logout
      alert("logout on browser not implemented");
      return;
    }
    this.authService.signOut();
    this.LoginInfo = null;
  }

}
