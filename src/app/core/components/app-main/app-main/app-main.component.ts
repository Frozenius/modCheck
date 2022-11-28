import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitchAccount } from '@core/interfaces/twitch-account';
import { TwitchService } from '@core/services/twitch.service';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit {
  profile: TwitchAccount | undefined;
  token: NbAuthOAuth2Token | undefined;
  streamerMode: boolean | undefined;
  private destroy$ = new Subject<void>();

  constructor(private auth: NbAuthService, private twitch: TwitchService, private router: Router) {
    if (!this.streamerMode) {
      const mode = localStorage.getItem('streamerMode');
      this.streamerMode = mode === 'true';
    }
  }

  ngOnInit() {
    this.twitch.profile$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (profile) => {
        this.profile = profile;
      },
    });
  }

  public switchStreamerMode() {
    if (typeof this.streamerMode == undefined) {
      this.streamerMode = true;
    }
    this.streamerMode = !!this.streamerMode;
    localStorage.setItem('streamerMode', String(this.streamerMode));
  }

  signOut() {
    this.auth
      .logout('twitch')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {
          this.router.navigate(['/auth/sign-in']);
        }
      });
  }
}
