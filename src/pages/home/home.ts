import { Restricted } from './../restricted/restricted';
import { AuthService } from './../../app/_services/auth.service';
import { AdalService } from 'ng2-adal/dist/core';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public isLoggedIn: boolean;
 
  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private adalService: AdalService) {
  }
  ngOnInit(): void {
    this.authService.isLoggedIn()
      .subscribe(u => this.isLoggedIn = u);
  }

  loginUser() {
    this.adalService.login();
  }
  logoutUser() {
    this.adalService.logOut();
  }
  nextPage() {
    this.navCtrl.push(Restricted);
  }
}
