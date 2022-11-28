import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, ErrorRoutingModule, IonicModule, ButtonModule, RippleModule],
})
export class ErrorModule {}
