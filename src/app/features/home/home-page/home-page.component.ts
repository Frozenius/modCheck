import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitchAccount } from '@core/interfaces/twitch-account';
import { TwitchService } from '@core/services/twitch.service';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  profile$: Observable<TwitchAccount> | undefined;
  followerCount = 0;
  subscriptionCount = 0;
  bannedUserCount = 0;
  token: NbAuthOAuth2Token | undefined;
  private destroy$ = new Subject<void>();

  constructor(private auth: NbAuthService, private twitch: TwitchService, private router: Router) {
    this.auth
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token) => {
        this.token = undefined;
        if (token && token.isValid()) {
          this.token = token as NbAuthOAuth2Token;
        } else {
          this.router.navigate(['/auth/sign-in']);
        }
      });
  }

  ngOnInit() {
    this.profile$ = this.twitch.profile$;
    this.twitch.profile$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (profile) => {
        if (profile) {
          this.getFollowerCount(profile.id);
          this.getSubscriptionCount(profile.id);
          this.getBannedUserCount(profile.id);
        }
      },
    });
  }

  signOut() {
    this.auth
      .logout('twitch')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reload() {
    const profile = this.profile$;
    if (profile) {
      this.profile$?.subscribe({
        next: (profile) => {
          this.getFollowerCount(profile.id);
          this.getSubscriptionCount(profile.id);
          this.getBannedUserCount(profile.id);
        },
      });
    }
  }

  private getFollowerCount(userId: string) {
    this.twitch.getFollowerCount(userId).subscribe((count) => {
      this.followerCount = count || 0;
    });
  }

  private getSubscriptionCount(userId: string) {
    this.twitch.getSubscriptionCount(userId).subscribe((count) => {
      this.subscriptionCount = count || 0;
    });
  }

  private getBannedUserCount(userId: string) {
    this.twitch.getBannedUserCount(userId).subscribe((count) => {
      this.bannedUserCount = count || 0;
    });
  }
}
