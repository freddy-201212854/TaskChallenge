import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/interface/task';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/components/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [ 'Id', 'Título', 'Descripción', 'Fecha', 'Estado', 'Acción'];
  dataSource: MatTableDataSource<any>;

  // Datos de ejemplo para la tabla
  users: Task [] = [
  { id: 1, title: 'Artículo 1', description: 'Descripción del artículo 1', dateCreated: '2024-01-01', status: true },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    // Configuración de la fuente de datos de la tabla
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Asignar el paginador y el ordenamiento a la fuente de datos
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Asignar la propiedad `length` del paginador utilizando `dataSource.data.length`
    this.paginator.length = this.dataSource.data.length;
  }
  
  // Método para eliminar un ítem
  deleteItem(item: Task): void {
    console.log('Eliminando el artículo:', item);
      // Aquí puedes agregar la lógica para eliminar el artículo (ej. confirmación de eliminación)
  }

  // Método para abrir el modal
  openCreateTaskDialog(id: Number = 0, edit: boolean=false) {
    
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '600px', // Puedes especificar el tamaño del modal
      data: { // Aquí puedes pasar datos al modal si lo necesitas
        id: id,
        edit: edit
      }
    });

    // Acciones a realizar cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Resultado del modal:', result);
      } else {
        console.log('El modal fue cerrado sin enviar datos.');
      }
    });
  }
}