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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator.length = this.dataSource.data.length;
  }
  
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

  openCreateTaskDialog(edit?: boolean, task?: Task) {
    
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '600px',
      data: {
        task: task,
        edit: edit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
      }
    });
  }

  UpdateTaskCheck(element: Task): void {

    this.taskservice.updateTask(element, element.id).subscribe((response) => {
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
}