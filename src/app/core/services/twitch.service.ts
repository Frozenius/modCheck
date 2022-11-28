import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { NbAuthOAuth2Token, NbAuthService } from '@nebular/auth';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { TwitchAccount } from '../interfaces/twitch-account';

@Injectable({
  providedIn: 'root',
})
export class TwitchService {
  token: NbAuthOAuth2Token | undefined;
  private destroy$ = new Subject<void>();

  private profile: BehaviorSubject<TwitchAccount> = new BehaviorSubject<any>(undefined);
  public profile$ = this.profile.asObservable();

  constructor(private http: HttpClient, private auth: NbAuthService) {
    this.auth
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (token) => {
          this.token = undefined;
          if (token && token.isValid()) {
            this.token = token as NbAuthOAuth2Token;
            this.getProfile();
          }
        },
      });
  }

  getFollowerCount(userId: string) {
    return this.http
      .get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${this.token?.getValue()}`,
          'Client-ID': environment.twitchConfig.clientId,
        },
      })
      .pipe(map((response: any) => response.total));
  }

  getSubscriptionCount(userId: string) {
    return this.http
      .get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${this.token?.getValue()}`,
          'Client-ID': environment.twitchConfig.clientId,
        },
      })
      .pipe(map((response: any) => response.total));
  }

  getBannedUserCount(userId: string) {
    return this.http
      .get(`https://api.twitch.tv/helix/moderation/banned?broadcaster_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${this.token?.getValue()}`,
          'Client-ID': environment.twitchConfig.clientId,
        },
      })
      .pipe(map((response: any) => response.total));
  }

  private getProfile() {
    return this.http
      .get(`https://api.twitch.tv/helix/users?scope=user:read`, {
        headers: {
          Authorization: `Bearer ${this.token?.getValue()}`,
          'Client-ID': environment.twitchConfig.clientId,
        },
      })
      .pipe(map((response: any) => response.data[0]))
      .subscribe({
        next: (profile: TwitchAccount) => {
          this.profile.next(profile);
        },
      });
  }
}
