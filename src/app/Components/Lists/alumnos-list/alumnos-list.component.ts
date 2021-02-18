import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/Models/alumno.model';
import { AlumnosService } from 'src/app/Services/alumnos.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss']
})
export class AlumnosListComponent implements OnInit {

  loading = true;
  alumnos: Alumno[];

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit(): void {
    this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this.alumnosService.getAllAlumnos().subscribe(data => {
      this.alumnos = data;
      this.loading = false;
    })
  }

  delete(alumno: Alumno){
    if (window.confirm('Está seguro que desea eliminar a: ' + alumno.nombre + '?')){
      this.alumnosService.deleteAlumno(alumno.alumno_id).subscribe(data =>{
        this.obtenerAlumnos();
      });
    }
  }
}
