import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer ${localStorage.get('graph_token')}"
      }
    });
    return next.handle(req);
  }
}
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
