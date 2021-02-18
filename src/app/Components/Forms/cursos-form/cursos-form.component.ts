import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from 'src/app/Services/profesores.service';
import { Profesor } from 'src/app/Models/profesor.model';
import { CursosService } from 'src/app/Services/cursos.service';
//Reactive Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanillasService } from 'src/app/Services/planillas.service';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  public formulario: FormGroup;
  formularioSucces: boolean = false;
  loading: boolean = true;
  modoEditar: boolean = false;
  modoVer: boolean = false;
  planilla_id: number;

  profesores: Profesor[];

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private cursoService: CursosService,
    private profesorService: ProfesoresService) {
  }

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    this.modoVer = this._router.url.indexOf('ver') !== -1;
    const curso_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    const planilla_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('planilla_id'), 10);
    if (planilla_id) {
      this.planilla_id = planilla_id;
    }

    this.formulario = this.createForm(curso_id);
  }

  //obtiene el valor de los componentes en el formulario
  get nombre() { return this.formulario.get('nombre'); }
  get fecha_inicio() { return this.formulario.get('fecha_inicio'); }
  get fecha_fin() { return this.formulario.get('fecha_fin'); }
  get cantidad_alumnos() { return this.formulario.get('cantidad_alumnos'); }
  get profesor() { return this.formulario.get('profesor'); }
  get profesor_id() { return this.formulario.get('profesor_id'); }
  get profesor_auxiliar() { return this.formulario.get('profesor_auxiliar'); }
  get profesor_auxiliar_id() { return this.formulario.get('profesor_auxiliar_id'); }

  createForm(curso_id) {
    if (curso_id) {
      this.cursoService.getCurso(curso_id).subscribe(
        curso => (
          this.formulario = new FormGroup({
            curso_id: new FormControl(curso.curso_id),
            nombre: new FormControl(curso.nombre, [Validators.required, Validators.minLength(5)]),
            fecha_inicio: new FormControl(curso.fecha_inicio, [Validators.required]),
            fecha_fin: new FormControl(curso.fecha_fin, [Validators.required]),
            cantidad_alumnos: new FormControl(curso.cantidad_alumnos, [Validators.required]),
            profesor: new FormControl(curso.profesor.nombre + ', DNI: ' + curso.profesor.dni),
            profesor_id: new FormControl(curso.profesor.profesor_id),
            profesor_auxiliar: new FormControl(curso.profesor_auxiliar != null ? curso.profesor_auxiliar.nombre + ', DNI: ' + curso.profesor_auxiliar.dni : null),
            profesor_auxiliar_id: new FormControl(curso.profesor_auxiliar != null ? curso.profesor_auxiliar.profesor_id : null),
          }),
          this.getProfesoresDiferentes(curso.profesor.profesor_id,
            curso.profesor_auxiliar != null ? curso.profesor_auxiliar.profesor_id : -1),
          this.loading = false
        ),
        err => {
          alert(`curso no encontrado (${curso_id}):\n` + `${err.message}`)
          this.volverAlListado()
        }
      )
    } else {
      this.loading = false;
      this.getProfesores();
      return new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
        fecha_inicio: new FormControl(Date.now().toString(), [Validators.required]),
        fecha_fin: new FormControl(Date.now().toString(), [Validators.required]),
        cantidad_alumnos: new FormControl(1, [Validators.required]),
        profesor: new FormControl(null),
        profesor_id: new FormControl(null, [Validators.required]),
        profesor_auxiliar: new FormControl(null),
        profesor_auxiliar_id: new FormControl(null),
      });
    }
  }

  onSaveForm() {
    if (this.formulario.valid && !this.modoEditar) {
      this.cursoService.postCurso(this.formulario.value).subscribe(
        (data) => {
          if (data == "Success") {
            this.mostrarAlerta();
          } else {
            alert(data);
          }
        },
      );
    }
    else if (this.formulario.valid && this.modoEditar) {
      this.cursoService.updateCurso(this.formulario.value)
        .subscribe(
          (data) => {
            if (data == "Success") {
              this.mostrarAlerta();
            } else {
              alert(data);
            }
          },
        )
    }
  }

  getProfesoresDiferentes(profesor_id, profesor_auxiliar_id) {
    this.profesorService.getProfesoresDiferentes(profesor_id, profesor_auxiliar_id).subscribe(data => {
      this.profesores = data;
    })
  }

  getProfesores() {
    this.profesorService.getAllProfesores().subscribe(data => {
      this.profesores = data;
    })
  }

  onResetForm() {
    this.formulario.reset();
  }

  private mostrarAlerta() {
    this.formularioSucces = true;
    setTimeout(() => {
      this.formularioSucces = false;
      this.volverAlListado();
    }, 2000);
  }

  private volverAlListado() {
    if (this.modoVer) {
      this._router.navigate(['/planillas', 'editar', this.planilla_id])
    } else {
      this._router.navigate(['/cursos', 'list'])
    }

  }

}
