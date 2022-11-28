import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { NbCardModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { CallbackRoutingModule } from './callback-routing.module';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [CallbackComponent],
  imports: [CommonModule, CallbackRoutingModule, NbLayoutModule, NbCardModule, NbSpinnerModule, IonicModule],
})
export class CallbackModule {}
