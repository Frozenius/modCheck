import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private auth: NbAuthService, private router: Router) {
    this.auth
      .authenticate('twitch')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (authResult: NbAuthResult) => {
          localStorage.setItem('token', JSON.stringify(authResult));
          if (authResult.isSuccess() && authResult.getRedirect()) {
            this.router.navigateByUrl('/modCheck');
          } else {
            this.router.navigate(['/auth/error']);
          }
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
