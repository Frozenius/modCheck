import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        switch (error?.status) {
          case 400:
            this.toastService.error('Bad Request', error.statusText);
            break;
          case 404:
            this.toastService.error('Item not found', error.statusText);
            break;
          case 401:
            this.toastService.error('Unauthorized', error.statusText);
            break;
          case 500:
            this.toastService.error('Something wrong in the server', error.statusText);
            break;
          default:
            this.toastService.error('An unknown error occurred', error.statusText);
            break;
        }
        return throwError(error);
      })
    );
  }
}
