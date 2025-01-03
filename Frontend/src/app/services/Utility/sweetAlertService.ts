import Swal from 'sweetalert2';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SweetAlert {

    constructor() {
    }

    showConfirmation(title: string, text: string, confirmButtonText: string = 'Sí', cancelButtonText: string = 'Cancelar') {
      return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff6a00',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
      });
    }
  
    // Método para mostrar una alerta de éxito
    showSuccess(title: string, text: string) {
      return Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonColor: '#ff6a00',
      });
    }
  
    // Método para mostrar una alerta de error
    showError(title: string, text: string) {
      return Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonColor: '#ff6a00',
      });
    }
  
    // Método para mostrar una alerta de información
    showInfo(title: string, text: string) {
      return Swal.fire({
        title: title,
        text: text,
        icon: 'info',
        confirmButtonColor: '#3085d6',
      });
    }
}
