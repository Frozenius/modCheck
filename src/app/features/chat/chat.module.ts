import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbButtonModule, NbCardModule, NbChatModule, NbLayoutModule } from '@nebular/theme';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [ChatRoomComponent],
  imports: [CommonModule, ChatRoutingModule, NbChatModule, NbLayoutModule, NbButtonModule, NbCardModule],
})
export class ChatModule {}
