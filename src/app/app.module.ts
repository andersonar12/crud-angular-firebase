import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Agrego aqui los componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employee/employee.component';

//Agrego aqui modulos creados
import { MaterialModule } from './material/material.module';

//Agrego aqui servicio
import { EmployeeService } from './shared/employee.service';
import { EliminarModalComponent } from './components/eliminar-modal/eliminar-modal.component';



@NgModule({
  entryComponents: [
    EmployeeComponent
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeesComponent,
    EmployeeComponent,
    EliminarModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
