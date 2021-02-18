import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/Models/alumno.model';
import { Asistencia } from 'src/app/Models/asistencia.model';
import { Curso } from 'src/app/Models/curso.model';
import { Planilla } from 'src/app/Models/planilla.model';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { AsistenciasService } from 'src/app/Services/asistencias.service';
import { CursosService } from 'src/app/Services/cursos.service';
import { PlanillasService } from 'src/app/Services/planillas.service';

@Component({
  selector: 'app-asistencias-list',
  templateUrl: './asistencias-list.component.html',
  styleUrls: ['./asistencias-list.component.scss']
})
export class AsistenciasListComponent implements OnInit {

  asistencias: Asistencia[];
  alumno: Alumno;
  alumnos: Alumno[];
  curso: Curso;
  cursos: Curso[];
  fecha: Date;

  encontrado: boolean = true;

  planilla: Planilla;

  loading = true;

  constructor(private asistenciasService: AsistenciasService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private planillasService: PlanillasService) { }

  ngOnInit(): void {
    this.inicializar();
  }

  obtenerAsistencias(): void {
    this.asistenciasService.getAllAsistencias().subscribe(data => {
      this.planilla.asistencias = data;
      this.loading = false;
    })
  }

  obtenerAlumnos(): void {
    this.alumnosService.getAllAlumnos().subscribe(data => {
      this.alumnos = data;
      //this.loading = false;
    })
  }

  obtenerCursos(): void {
    this.cursosService.getAllCursos().subscribe(data => {
      this.cursos = data;
      //this.loading = false;
    })
  }

  inicializar(){
    this.planilla = {
      fecha: null,
      asistencias: null,
    };
    this.fecha = null;
    this.obtenerAsistencias();
    this.obtenerAlumnos();
    this.obtenerCursos();
    this.encontrado = true;
  }

  buscarAsistencia(){
    this.planillasService.getPlanillaFecha(this.curso.curso_id, this.alumno.alumno_id, this.fecha).subscribe(data => {
      // data != null ? this.planilla = data : this.obtenerAsistencias();
      this.planilla = data;
      this.encontrado = true;

      if (this.planilla == null){
        this.encontrado = false;
      }

    })
  }

  refrescarAsistencias(){
    this.inicializar();
  }


  // delete(asistencia: Asistencia){
  //   if (window.confirm('Está seguro que desea eliminar a: ' + asistencia.alumno.nombre + '?')){
  //     this.asistenciasService.deleteAsistencia(asistencia.asistencia_id).subscribe(data =>{
  //       this.obtenerAsistencias();
  //     });
  //   }
  // }

}
