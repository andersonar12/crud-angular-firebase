import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService, EmployeeInformacion } from '../../shared/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { EliminarModalComponent } from '../eliminar-modal/eliminar-modal.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  spinner: boolean = false;

  isPopupOpened: boolean = false;

  empleados: EmployeeInformacion[] = [];


  constructor(private employee: EmployeeService, public dialog: MatDialog) { }

  ngOnInit() {

    this.spinner = true;

    this.employee.obtenerEmpleados().subscribe(resp => {
      this.empleados = resp;
      this.spinner = false
    });

    ///////////Actualizar la tabla////////

    setInterval(() => {
      this.employee.obtenerEmpleados().subscribe((resp) => {

        if (resp === this.empleados) { return; }
        else {
          this.empleados = resp;
        }
        this.spinner = false
      });
    }, 1000);
  }

  actualizarEmpleado(empleado: EmployeeInformacion) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '650px',
      data: { arg1: empleado.id }
    });
  }

  borrarEmpleado(empleado: EmployeeInformacion, i: number) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '410px',
      data: { arg1: empleado.id, arg2: i, arg3: this.empleados }
    });
  }

  agregarEmpleado() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '650px',
      data: ''
    });
  }

}
