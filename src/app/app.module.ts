import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';

//Forms
import { CursosFormComponent } from './Components/Forms/cursos-form/cursos-form.component';
import { PlanillasFormComponent } from './Components/Forms/planillas-form/planillas-form.component';
import { ProfesoresFormComponent } from './Components/Forms/profesores-form/profesores-form.component';
import { AlumnosFormComponent } from './Components/Forms/alumnos-form/alumnos-form.component';
//Lists
import { CursosListComponent } from './Components/Lists/cursos-list/cursos-list.component';
import { PlanillasListComponent } from './Components/Lists/planillas-list/planillas-list.component';
import { ProfesoresListComponent } from './Components/Lists/profesores-list/profesores-list.component';
import { AlumnosListComponent } from './Components/Lists/alumnos-list/alumnos-list.component';
import { AsistenciasListComponent } from './Components/Lists/asistencias-list/asistencias-list.component';
//Otros
import { NavBarComponent } from './Components/Nav/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosDetalleComponent } from './Components/Detalles/cursos-detalle/cursos-detalle.component';
import { AlumnosDetalleComponent } from './Components/Detalles/alumnos-detalle/alumnos-detalle.component';
import { ProfesoresDetalleComponent } from './Components/Detalles/profesores-detalle/profesores-detalle.component';
import { PlanillasDetalleComponent } from './Components/Detalles/planillas-detalle/planillas-detalle.component';



@NgModule({
  declarations: [
    AppComponent,
    CursosFormComponent,
    ProfesoresFormComponent,
    AlumnosFormComponent,
    PlanillasFormComponent,
    PlanillasListComponent,
    CursosListComponent,
    AlumnosListComponent,
    ProfesoresListComponent,
    NavBarComponent,
    CursosDetalleComponent,
    AlumnosDetalleComponent,
    ProfesoresDetalleComponent,
    PlanillasDetalleComponent,
    AsistenciasListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
