import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '@core/http/http-error.interceptor';
import { AuthenticationService } from '@core/services/authentication.service';
import { TwitchService } from '@core/services/twitch.service';
import { environment } from '@environment/environment';
import { NbAuthModule, NbAuthOAuth2Token, NbOAuth2AuthStrategy, NbOAuth2GrantType } from '@nebular/auth';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          clientId: environment.twitchConfig.clientId,
          clientSecret: environment.twitchConfig.clientSecret,
          defaultMessages: ['Successfully logged in.'],
          name: 'twitch',
          baseEndpoint: 'https://id.twitch.tv/oauth2/',
          redirect: {
            success: 'auth/callback',
            failure: 'auth/error',
          },
          token: {
            endpoint: `token?client_secret=${environment.twitchConfig.clientSecret}`,
            grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
            class: NbAuthOAuth2Token,
            redirectUri: 'http://localhost/auth/callback',
          },
          authorize: {
            endpoint: 'authorize',
            scope:
              'analytics:read:extensions analytics:read:games bits:read channel:read:charity channel:read:editors channel:read:goals channel:read:hype_train channel:read:polls channel:read:predictions channel:read:redemptions channel:read:subscriptions channel:read:vips moderation:read moderator:read:blocked_terms moderator:read:chat_settings moderator:read:chatters user:read:email user:read:follows user:read:subscriptions user_read',
            responseType: 'code',
            redirectUri: 'http://localhost/auth/callback',
          },
          refresh: {
            endpoint: 'token',
            grantType: NbOAuth2GrantType.REFRESH_TOKEN,
          },
        }),
      ],
    }),
    NbLayoutModule,
    MessagesModule,
  ],
  providers: [
    MessageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    AuthenticationService,
    TwitchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
