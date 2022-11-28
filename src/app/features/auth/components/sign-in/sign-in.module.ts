import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NbButtonModule } from '@nebular/theme';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TwitchLoginSdkModule } from 'twitch-login-sdk';
import { environment } from '../../../../../environments/environment';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    IonicModule,
    SignInRoutingModule,
    ButtonModule,
    RippleModule,
    TwitchLoginSdkModule.forRoot({
      twitchId: environment.twitchConfig.clientId,
      redirect: environment.twitchConfig.redirect,
    }),
    NbButtonModule,
  ],
})
export class SignInModule {}
