import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { SweetAlert } from '../../services/sweetAlertService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;  // FormGroup para almacenar los valores del formulario

  constructor(private fb: FormBuilder,
              private sweetAlertService: SweetAlert
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

    this.sweetAlertService.showConfirmation('El usuario no existe', ' ¿ Desea regisrarlo ?')
      .then((result) => {
        if (result.isConfirmed) {
          this.sweetAlertService.showSuccess('¡Usuario registrado!', 'Sesión iniciada');
        } else {
          this.sweetAlertService.showError('Cancelado', 'El usuario ingresado no existe');
        }
      });
  }

}
