import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/Models/profesor.model';
import { ProfesoresService } from 'src/app/Services/profesores.service';


@Component({
  selector: 'app-profesores-list',
  templateUrl: './profesores-list.component.html',
  styleUrls: ['./profesores-list.component.scss']
})
export class ProfesoresListComponent implements OnInit {

  loading = true;
  profesores: Profesor[];

  constructor(private profesoresService: ProfesoresService) { }

  ngOnInit(): void {
    this.obtenerProfesores();
  }

  obtenerProfesores(): void {
    this.profesoresService.getAllProfesores().subscribe(data => {
      this.profesores = data;
      this.loading = false;
    })
  }

  delete(profesor: Profesor){
    if (window.confirm('Está seguro que desea eliminar a: ' + profesor.nombre + '?')){
      this.profesoresService.deleteProfesor(profesor.profesor_id).subscribe(data =>{
        this.obtenerProfesores();
      });
    }
  }

}
