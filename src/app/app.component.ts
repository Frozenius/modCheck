import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: NbAuthService, private router: Router) {
    this.auth.onTokenChange().subscribe({
      next: (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/auth/sign-in');
        }
      },
    });
  }
}
