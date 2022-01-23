import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeInformacion, EmployeeService } from 'src/app/shared/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  //Se inicia el modelo de datos  
  empleado = new EmployeeInformacion();

  //Para las suscripciones a las peticiones del servicio
  crearEmpleado: any;
  actEmpleado: any;

  constructor( public dialogRef: MatDialogRef<EmployeeComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
                private employeService: EmployeeService,
                private snackbar:EmployeeService,
             ) { }


  ngOnInit() {

    /* console.log(this.data) */

    if (this.data == '' || this.data == null) {

      /* console.log('Primera condicion activada'); */
      return this.empleado.id = '';
    }
    else {
      /* console.log(this.data) */
      this.crearEmpleado = this.employeService.obtenerEmpleado(this.data.arg1)
      .subscribe((resp: EmployeeInformacion) => {
        this.empleado = resp;
        this.empleado.id = this.data.arg1;

      return this.crearEmpleado;
        })
    }
    
  }

  guardar(formulario: NgForm) {

    if (formulario.invalid || formulario.value == '') {
      this.snackbar.openSnackBar('Faltan campos por llenar, verifica','');
  
      return;
    }

    if (this.empleado.id) {
     this.actEmpleado = this.employeService.actualizarEmpleado(this.empleado)
        .subscribe (resp =>{
          this.dialogRef.close();
           this.snackbar.openSnackBar(this.empleado.nombreCompleto, 'Empleado Actualizado');
           
        })
    } else{
      this.actEmpleado = this.employeService.crearEmpleado(this.empleado)
        .subscribe(resp => {
          this.dialogRef.close();
          this.snackbar.openSnackBar(this.empleado.nombreCompleto, 'Agregado Correctamente');
          this.empleado = resp;
        });
    }
  }

  clear(formulario:NgForm) {
    
    formulario.setValue({ id: "", 
                          ciudad: "",
                          departamento: "",
                          email: "",
                          fechaInicio: "",
                          nombreCompleto: "",
                          telefono: ""});

    /* console.log("Limpiado el formulario");
    console.log('Formulario no valido', formulario.value ); */

    /* const inputsVal = document.querySelectorAll('input');
    inputsVal.forEach((element => { element.value = '' })); */
  }

 ngOnDestroy() {  
      
    }

}
