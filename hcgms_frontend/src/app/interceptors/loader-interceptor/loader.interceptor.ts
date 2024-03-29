import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/loader-service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show()
    return next.handle(request).pipe(
      delay(500),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
