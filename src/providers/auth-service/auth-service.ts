import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

export interface LoginInfo {
  loggedIn: boolean;
  userId: string;
  familyName: string;
  givenName: string;
  passwordChangeUrl: string;
  passwordExpiresOn: Date;
}

@Injectable()
export class AuthServiceProvider {

  public UserId: string;
  public AccessToken: string;

  constructor(private msAdal: MSAdal) {
  }
  // Private resources
  _aadAuthContext: AuthenticationContext = null;
  _aadAuthority: string = "https://login.windows.net/79f641ca-5bdb-49ea-b795-8fea5279e716";
  _aadAppClientId: string = "89b27a0d-e1c9-4ac4-bba5-4c8f42c029d0";
  _aadAppRedirect: string = "http://mydirectorysearcherapp/";
  _graphResource: string = "https://graph.windows.net";
  _odataResource: string = "https://mfo-odata.azurewebsites.net";

  // Private function to get authentication context using ADAL
  ensureContext() {
    return new Promise((resolve, reject) => {
      // Check if aadAuthContext is already initialized
      if (this._aadAuthContext == null) {
        // aadAuthContext is null...initialize it
        this._aadAuthContext = this.msAdal.createAuthenticationContext(this._aadAuthority, false);
        resolve(this._aadAuthContext);
      }
      else {
        // aadAuthContext is already initialized so resolve in promise
        resolve(this._aadAuthContext);
      }
    });
  }

  // Private function to get access token for a specific resource using ADAL
  getTokenForResource(resource) {
    var helper = this;
    return new Promise<LoginInfo>((resolve, reject) => {
      this.ensureContext().then(function (context) {
        // First try to get the token silently
        helper.getTokenForResourceSilent(context, resource).then(function (authResponse: AuthenticationResult) {
          // We were able to get the token silently...return it
          resolve({
            loggedIn: true, userId: authResponse.userInfo.userId,
            familyName: authResponse.userInfo.familyName, givenName: authResponse.userInfo.givenName,
            passwordChangeUrl: authResponse.userInfo.passwordChangeUrl, passwordExpiresOn: authResponse.userInfo.passwordExpiresOn
          });
        }, function (err) {
          // We failed to get the token silently...try getting it with user interaction
          helper._aadAuthContext.acquireTokenAsync(resource, helper._aadAppClientId, helper._aadAppRedirect, null, null)
            .then(function (authResponse: AuthenticationResult) {
              // Resolve the promise with the token
              resolve({
                loggedIn: true, userId: authResponse.userInfo.userId,
                familyName: authResponse.userInfo.familyName, givenName: authResponse.userInfo.givenName,
                passwordChangeUrl: authResponse.userInfo.passwordChangeUrl, passwordExpiresOn: authResponse.userInfo.passwordExpiresOn
              });
            }, function (err) {
              // Reject the promise
              reject("Error getting token");
            });
        });
      });
    });
  }

  // Private function to get access token for a specific resource silent using ADAL
  getTokenForResourceSilent(context, resource) {
    var helper = this;
    return new Promise<AuthenticationResult>((resolve, reject) => {
      // read the tokenCache
      context.tokenCache.readItems().then(function (cacheItems) {
        // get userId from first cached token
        var user_id;
        if (cacheItems.length > 1) {
          user_id = cacheItems[0].userInfo.userId;
        }
        context.acquireTokenSilentAsync(resource, helper._aadAppClientId, user_id)
          .then(function (authResult: AuthenticationResult) {
            // Resolve the authResult from the silent token call
            resolve(authResult);
          }, function (err) {
            // Error getting token silent...reject the promise
            reject("Error getting token silent");
          });
      }, function (err) {
        // Error getting cached data...reject the promise
        reject("Error reading token cache");
      });
    });
  }

  // check authenticated by getting token silently
  checkAuth() {
    var helper = this;
    return new Promise((resolve, reject) => {
      helper.ensureContext().then(function (context) {
        // First try to get the token silently
        helper.getTokenForResourceSilent(context, helper._graphResource).then(function (token) {
          // We were able to get the token silently...return it
          resolve(true);
        }, function (err) {
          // We failed to get the token silently
          resolve(false);
        });
      });
    });
  }

  // Try signin
  signIn() {
    return new Promise<LoginInfo>((resolve, reject) => {
      this.signOut(); // get rid of all cached tokens
      this.getTokenForResource(this._graphResource)
        .then(function (response) {
          resolve(response);
        }, function (err) {
          reject("Sign-in failed");
        });
    });
  }
  signOut()
  {
    this.ensureContext().then(function (context: AuthenticationContext) {
      context.tokenCache.clear();
    });
  }
}
