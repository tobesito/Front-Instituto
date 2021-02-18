import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Models/curso.model';
import { CursosService } from 'src/app/Services/cursos.service';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss']
})
export class CursosListComponent implements OnInit {

  loading = true;

  contCursos = 1;
  cursos: Curso[];

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.cursosService.getAllCursos().subscribe(data => {
      this.cursos = data;
      this.loading = false;
    })
  }

  delete(curso: Curso){
    if (window.confirm('Está seguro que desea eliminar a: ' + curso.nombre + '?')){
      this.cursosService.deleteCurso(curso.curso_id).subscribe(data =>{
        this.obtenerCursos();
      });
    }
  }

}
