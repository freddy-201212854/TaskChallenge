import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/interface/task';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/components/create-task-dialog/create-task-dialog.component';
import { TaskService } from 'src/app/services/Connections/taskservice';
import { SweetAlert } from 'src/app/services/Utility/sweetAlertService';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Connections/authservice';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [ 'Id', 'Título', 'Descripción', 'Fecha', 'Estado', 'Acción'];
  dataSource: MatTableDataSource<any>;

  // Datos de ejemplo para la tabla
  tasks: Task [] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
              private taskservice: TaskService,
              private authservice: AuthService,
              private sweetAlertService: SweetAlert,
              private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngOnInit(): void {
    this.getTask()
  }

  getTask(): void {
    this.tasks = [];

    this.taskservice.getTasks().subscribe((response) => {
      if (response && response.code == 200) {
        this.tasks = response.list;
        this.dataSource = new MatTableDataSource(this.tasks);

      } else {
        this.dataSource = new MatTableDataSource(this.tasks);

        this.sweetAlertService.showError('Error', response.error.message);
        if (response.error.code == 401) {
          this.authservice.logout();
          this.router.navigate(['/login']); 
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // Asignar el paginador y el ordenamiento a la fuente de datos
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Asignar la propiedad `length` del paginador utilizando `dataSource.data.length`
    this.paginator.length = this.dataSource.data.length;
  }
  
  // Método para eliminar un ítem
  deleteItem(item: Task): void {
    this.taskservice.deleteTask(item.id).subscribe((response) => {
      if (response && response.code == 200) {
        this.getTask();
      } else {
        this.sweetAlertService.showError('Error', response.error.message);
        if (response.error.code == 401) {
          this.authservice.logout();
          this.router.navigate(['/login']); 
        }
      }
    });
  }

  // Método para abrir el modal
  openCreateTaskDialog(edit?: boolean, task?: Task) {
    
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '600px', // Puedes especificar el tamaño del modal
      data: { // Aquí puedes pasar datos al modal si lo necesitas
        task: task,
        edit: edit
      }
    });

    // Acciones a realizar cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result, edit, task);
        if (result && !edit) {
          result.status = result.status == 'Pendiente' ? false: true;
          this.taskservice.createTask(result).subscribe((response) => {
            if (response && response.code == 200) {
              this.getTask();
            } else {
              this.sweetAlertService.showError('Error', response.error.message);
              if (response.error.code == 401) {
                this.authservice.logout();
                this.router.navigate(['/login']); 
              }
            }
          });
        }else if (result && edit && task){
          result.status = result.status == 'Pendiente' ? false: true;
          this.taskservice.updateTask(result, task.id).subscribe((response) => {
            if (response && response.code == 200) {
              this.getTask();
            } else {
              this.sweetAlertService.showError('Error', response.error.message);
              if (response.error.code == 401) {
                this.authservice.logout();
                this.router.navigate(['/login']); 
              }
            }
          });
        }       
      } else {
        console.log('El modal fue cerrado sin enviar datos.');
      }
    });
  }
}