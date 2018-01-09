import { Injectable } from '@angular/core';

@Injectable()
export class AdalConfigService {
  public get adalConfig(): any {
    return {
      tenant: '79f641ca-5bdb-49ea-b795-8fea5279e716', // Enpoints -> OAuth 2.0 Authorization Endpoint: https://login.windows.net/{tenant}/oauth2
      clientId: 'd017633c-c807-4730-8c6e-f4af6f58b68d', // Application ID
      redirectUri: window.location.origin + '/auth-callback',
      postLogoutRedirectUri: window.location.origin + '/auth-callback'
    };
  }
}
