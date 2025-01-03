import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../interface/user';
import { environment } from '../../environment/environments';
import { Task } from 'src/app/interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Método privado para generar los encabezados de la solicitud
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`,
    });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return of(error);
  }

  getTasks(): Observable<any> {
    const httpOptions = { headers: this.getHeaders() };
    return this.http.get<any>(`${this.apiUrl}tasks`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<any> {
    const httpOptions = { headers: this.getHeaders() };
    return this.http.post<any>(`${this.apiUrl}tasks`, task, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(task: Task, id: Number): Observable<any> {
    const httpOptions = { headers: this.getHeaders() };
    return this.http.put<any>(`${this.apiUrl}tasks/${id}`, task, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: Number): Observable<any> {
    const httpOptions = { headers: this.getHeaders() };
    return this.http.delete<any>(`${this.apiUrl}tasks/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
