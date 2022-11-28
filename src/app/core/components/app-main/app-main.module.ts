import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppMainComponent } from '@core/components/app-main/app-main/app-main.component';
import { IonicModule } from '@ionic/angular';
import { BadgeModule } from 'primeng/badge';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { AppMainRoutingModule } from './app-main-routing.module';

@NgModule({
  declarations: [AppMainComponent],
  imports: [CommonModule, AppMainRoutingModule, RippleModule, StyleClassModule, InputTextModule, BadgeModule, IonicModule, InputSwitchModule, FormsModule],
})
export class AppMainModule {}
