import { Injectable } from '@angular/core';

declare var Microsoft: any;


@Injectable()
export class AuthServiceProvider {

  constructor() {
   }
   // Private resources
   _aadAuthContext  = null;
   _aadAuthority : string = "https://login.windows.net/79f641ca-5bdb-49ea-b795-8fea5279e716";
   _aadAppClientId : string = "d017633c-c807-4730-8c6e-f4af6f58b68d";
   _aadAppRedirect : string = "http://AngularAdalConnect";
   _graphResource : string = "https://graph.microsoft.com";

   // Private function to get authentication context using ADAL
   ensureContext() {
       return new Promise((resolve, reject) => {
           // Check if aadAuthContext is already initialized
           if (this._aadAuthContext == null) {
               // aadAuthContext is null...initialize it
               this._aadAuthContext = Microsoft.Adal.AuthenticationContext(this._aadAuthority, false);
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
       return new Promise((resolve, reject) => {
           this.ensureContext().then(function (context) {
               // First try to get the token silently
               helper.getTokenForResourceSilent(context, resource).then(function (token) {
                   // We were able to get the token silently...return it
                   resolve(token);
               }, function (err) {
                   // We failed to get the token silently...try getting it with user interaction
                   helper._aadAuthContext.acquireTokenAsync(resource, helper._aadAppClientId, helper._aadAppRedirect, null, null)
                   .then(function (token) {
                       // Resolve the promise with the token
                       resolve(token);
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
       return new Promise((resolve, reject) => {
           // read the tokenCache
           context.tokenCache.readItems().then(function (cacheItems) {
               // Try to get the roken silently
               var user_id;
               if (cacheItems.length > 1) {
                   user_id = cacheItems[0].userInfo.userId;
               }
               context.acquireTokenSilentAsync(resource, helper._aadAppClientId, user_id).then(function (authResult) {
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
                   // We failed to get the token silently...try getting it with user interaction
                   resolve(false);
               });
           });
       });
   }

   // Try signin
   signin() {
       return new Promise((resolve, reject) => {
           this.getTokenForResource(this._graphResource).then(function(token) {
               resolve(token);
           }, function(err) {
               reject("Sign-in failed");
           });
       });
   }
}
