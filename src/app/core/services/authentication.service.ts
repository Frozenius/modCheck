import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TwitchAccount } from '../interfaces/twitch-account';
import { TwitchService } from './twitch.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<TwitchAccount | undefined>(undefined);
  public user$ = this.userSubject.asObservable();
  private tokenSubject = new BehaviorSubject<string | undefined>(undefined);
  public token$ = this.tokenSubject.asObservable();
  private requestToken = new BehaviorSubject<string | undefined>(undefined);
  public requestToken$ = this.requestToken.asObservable();

  constructor(private router: Router, private http: HttpClient, private twitch: TwitchService) {}

  public authenticate(provider: string) {
    return;
  }
}
