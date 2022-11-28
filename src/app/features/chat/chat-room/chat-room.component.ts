import { Component, OnInit } from '@angular/core';
import { TwitchAccount } from '@core/interfaces/twitch-account';
import { TwitchService } from '@core/services/twitch.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  public messages: any[] = [];
  private profile: TwitchAccount | undefined;

  constructor(private twitch: TwitchService) {
    this.twitch.profile$.subscribe({
      next: (profile) => {
        this.profile = profile;
      },
    });
  }

  ngOnInit() {}

  public sendMessage(event: any) {
    const files = !event.files
      ? []
      : event.files.map((file: any) => {
          return {
            url: file.src,
            type: file.type,
            icon: 'file-text-outline',
          };
        });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: this.profile?.display_name,
        avatar: this.profile?.profile_image_url,
      },
    });
  }
}
