import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AdalConfigService } from '../../app/_services/adal-config.service';
import { AuthService } from '../../app/_services/auth.service';
import { AdalService } from 'ng2-adal/dist/core';

@Component({
    selector: 'page-auth-callback',
    template: '<div><h3>Auth callback redirecting...</h3></div>'
})

export class AuthCallback implements OnInit {

    public message: string;

  constructor(
    public navCtrl: NavController,
    private adalService: AdalService,
    private authService: AuthService,
    private adalConfigService: AdalConfigService,
  ) {
    this.adalService.init(this.adalConfigService.adalConfig);
  }

  ngOnInit(): void {
    this.authService
      .isLoggedIn()
      .subscribe(isLoggedIn => {
        if (isLoggedIn === true) {
          console.log('authenticated...');
          this.navCtrl.push('home');
        } else {
          console.log('not authenticated...');
          this.navCtrl.push('');
        }
      },
      error => {
        console.log('not authenticated - ERROR...');
        this.navCtrl.push('');
        console.log(error);
      },
      () => console.log('auth-callback complete'));
  }
}
