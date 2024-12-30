import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;  // FormGroup para almacenar los valores del formulario

  constructor(private fb: FormBuilder) { 
    // Inicializamos el formulario con FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Campo de email
      password: ['', [Validators.required, Validators.minLength(6)]]  // Campo de contraseña
    });
  }

  ngOnInit(): void {}

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      console.log('Formulario enviado:', formValues);
      // Aquí puedes agregar la lógica de autenticación
    } else {
      console.log('Formulario inválido');
    }
  }

}
