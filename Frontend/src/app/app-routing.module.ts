import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TaskComponent } from './pages/task/task.component';
import {AuthGuardService as AuthGuard} from '../app/services/auth-guard-service.service';


const routes: Routes = [
  { path: 'login', component:LoginComponent }, // Ruta para el componente Login
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: 'task', component: TaskComponent, /*canActivate: [AuthGuard]*/  }, // Ruta para el componente Task
  { path: '**', redirectTo: '/login' },  // Ruta comodín para cualquier ruta desconocida

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
