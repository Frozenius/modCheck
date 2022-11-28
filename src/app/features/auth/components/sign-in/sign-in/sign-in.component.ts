import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private token: NbAuthOAuth2Token | undefined;

  constructor(private auth: NbAuthService) {
    this.auth
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthToken) => {
        if (token.isValid()) {
          this.token = token as NbAuthOAuth2Token;
        }
      });
  }

  signIn() {
    this.auth
      .authenticate('twitch')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
