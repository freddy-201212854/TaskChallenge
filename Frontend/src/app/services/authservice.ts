// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de tu backend de autenticación
  private tokenKey = 'auth_token'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(user: User): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${user.email}`).pipe(
      catchError(error => {
        return of(error);
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user).pipe(
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

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Devuelve true si hay un token almacenado
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
