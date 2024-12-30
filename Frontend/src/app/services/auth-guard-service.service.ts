import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public router: Router) {
    }

    canActivate(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
              this.router.navigate(['/login']);
              observer.next(false);
              observer.complete();
            }
        );
    }
}
