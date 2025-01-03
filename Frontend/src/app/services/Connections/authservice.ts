// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../interface/user';
import { environment } from '../../environment/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(user: User): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${user.email}`).pipe(
      catchError(error => {
        return of(error);
      })
    );
  }
  // Método para registrar un usuario
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users`, user).pipe(
      catchError(error => {
        return of(error);
      })
    );
  }

  // Método para almacenar el token
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para verificar si el usuario está autenticado y utilizado en el canActivate
  isAuthenticated(): Observable<any> {
    return new Observable((observer: Observer<boolean>) => {
      const token = this.getToken();
      if (token) {
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
