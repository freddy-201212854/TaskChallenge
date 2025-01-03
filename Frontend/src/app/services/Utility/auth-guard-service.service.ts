import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from '../Connections/authservice';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public router: Router,
                private authservice: AuthService
    ) {
    }

    canActivate(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.authservice.isAuthenticated().subscribe((logged) => {
                if (!logged) {
                    this.router.navigate(['/login']);
                    observer.next(false);
                    observer.complete();
                }
                observer.next(true);
                observer.complete();
            });
            }
        );
    }
}
