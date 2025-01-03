import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { SweetAlert } from '../../services/Utility/sweetAlertService';
import { AuthService } from 'src/app/services/Connections/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;  // FormGroup para almacenar los valores del formulario

  constructor(private fb: FormBuilder,
              private sweetAlertService: SweetAlert,
              private authService: AuthService,
              private router: Router
  ) { 
    // Inicializamos el formulario con FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Campo de email
    });
  }

  ngOnInit(): void {}

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    
    const email: User = {
      email: this.loginForm.get('email')?.value
    } 

    this.authService.login(email).subscribe((response) => {
      console.log(response);
      if (response && response.token) {
        // Si la respuesta contiene el token, lo guardamos y redirigimos
        this.authService.saveToken(response.token);
        this.router.navigate(['/task']);  // Redirige al dashboard u otra página
      } else {
        this.sweetAlertService.showConfirmation('El usuario no existe', ' ¿ Desea regisrarlo ?')
       .then((result) => {
         if (result.isConfirmed) {

           this.authService.register(email).subscribe((response) => {
              if (response.code == 200) {
                this.sweetAlertService.showSuccess('¡Usuario registrado!', 'Sesión iniciada');
                this.router.navigate(['/task']);  // Redirige al dashboard u otra página

              } else {
                this.sweetAlertService.showError('Error', response.error.message);
                this.authService.logout();
              }
           });  
         } else {
           this.sweetAlertService.showError('Cancelado', 'El usuario ingresado no existe');
         }
        });
      }
    });
  }

}
