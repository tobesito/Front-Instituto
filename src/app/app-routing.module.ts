import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

//Lists Imports
import { CursosListComponent } from './Components/Lists/cursos-list/cursos-list.component';
import { PlanillasFormComponent } from './Components/Forms/planillas-form/planillas-form.component';
import { ProfesoresFormComponent } from './Components/Forms/profesores-form/profesores-form.component';
import { AlumnosFormComponent } from './Components/Forms/alumnos-form/alumnos-form.component';
import { AsistenciasListComponent } from './Components/Lists/asistencias-list/asistencias-list.component';

//Form Imports
import { CursosFormComponent } from './Components/Forms/cursos-form/cursos-form.component';
import { PlanillasListComponent } from './Components/Lists/planillas-list/planillas-list.component';
import { ProfesoresListComponent } from './Components/Lists/profesores-list/profesores-list.component';
import { AlumnosListComponent } from './Components/Lists/alumnos-list/alumnos-list.component';

//Detalle Imports
import { CursosDetalleComponent } from './Components/Detalles/cursos-detalle/cursos-detalle.component';
import { PlanillasDetalleComponent } from './Components/Detalles/planillas-detalle/planillas-detalle.component';
import { ProfesoresDetalleComponent } from './Components/Detalles/profesores-detalle/profesores-detalle.component';
import { AlumnosDetalleComponent } from './Components/Detalles/alumnos-detalle/alumnos-detalle.component';


const routes: Routes = [

  {path: 'cursos/list', component: CursosListComponent},
  {path: 'cursos/nuevo', component: CursosFormComponent},
  {path: 'cursos/editar/:id', component: CursosFormComponent},
  {path: 'cursos/ver/:id', component: CursosDetalleComponent},

  {path: 'planillas/list', component: PlanillasListComponent},
  {path: 'planillas/nueva', component: PlanillasFormComponent},
  {path: 'planillas/editar/:id', component: PlanillasFormComponent},
  {path: 'planillas/ver/:id', component: PlanillasDetalleComponent},

  {path: 'profesores/list', component: ProfesoresListComponent},
  {path: 'profesores/nuevo', component: ProfesoresFormComponent},
  {path: 'profesores/editar/:id', component: ProfesoresFormComponent},
  {path: 'profesores/ver/:id', component: ProfesoresDetalleComponent},

  {path: 'alumnos/list', component: AlumnosListComponent},
  {path: 'alumnos/nuevo', component: AlumnosFormComponent},
  {path: 'alumnos/editar/:id', component: AlumnosFormComponent},
  {path: 'alumnos/ver/:id', component: AlumnosDetalleComponent},

  {path: 'asistencias/list', component: AsistenciasListComponent},

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cursos/list',
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
