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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      title: [data.edit ? data.task.title: '', [Validators.required]],
      description: [data.edit ? data.task.description: '', [Validators.required]],
      dateCreated: [new Date().toLocaleDateString(), [Validators.required]],
      status: [data.edit ? data.task.status ? 'Completada' : 'Pendiente' : '', [Validators.required]]
    });
  }

  onSubmit() {    
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
