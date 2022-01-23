import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL = environment.urlDataFirebase

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  crearEmpleado(empleado: EmployeeInformacion) {
    return this.http.post(`${this.URL}/empleados.json`, empleado).pipe(
      map((resp: { name: string }) => {
        console.log(resp);
        empleado.id = resp.name;
        return empleado;
      })
    );
  } //El pipe .map de Rxjs Operators es para transformar la respuesta o lo que devuelve el Observable *******

  actualizarEmpleado(empleado: EmployeeInformacion) {
    const empleTemp = {
      ...empleado
    };
    delete empleTemp.id;
    return this.http.put(`${this.URL}/empleados/${empleado.id}.json`, empleTemp);
  }

  obtenerEmpleados() {

    return this.http.get<EmployeeInformacion[]>(`${this.URL}/empleados/.json`)
      .pipe(map(this.convertirObjetoaArray), delay(500));
  }

  obtenerEmpleado(id: string) {

    return this.http.get<EmployeeInformacion>(`${this.URL}/empleados/${id}.json`);
  }

  borrarEmpleado(id: string) {

    return this.http.delete(`${this.URL}/empleados/${id}.json`);
  }

  // funcion personalizada para convertir un Objeto en un arreglo
  private convertirObjetoaArray(empleadosObj: Object) {

    const empleadosTemp: EmployeeInformacion[] = [];

    if (empleadosObj === null) { return []; }

    Object.keys(empleadosObj).forEach(key => {

      const empleado: EmployeeInformacion = empleadosObj[key];

      empleado.id = key;

      empleadosTemp.push(empleado);
    })

    return empleadosTemp;
  }
  //FIN  funcion personalizada para convertir un Objeto en un arreglo


  openSnackBar(arg1: string, arg2: string) {
    this._snackBar.open(arg1, arg2, {
      duration: 50000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['blue-snackbar', 'mat-simple-snackbar']
    });


  }
}


export class EmployeeInformacion {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono: number;
  ciudad: string;
  departamento: string;
  fechaInicio: number;
}
