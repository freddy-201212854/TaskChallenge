import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Se inyecta la data si es necesario
  ) {
    // Inicializando el formulario
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dateCreated: [new Date().toLocaleDateString(), [Validators.required]],
      status: ['Activa', [Validators.required]]
    });
  }

  // Método para cerrar el modal y devolver los datos
  onSubmit() {
    console.log(this.data);
    
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  // Método para cerrar el modal sin devolver nada
  onCancel() {
    this.dialogRef.close();
  }
}
