import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { PlanillasService } from 'src/app/Services/planillas.service';
//Reactive Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/Models/curso.model';
import { CursosService } from 'src/app/Services/cursos.service';
import { AsistenciasService } from 'src/app/Services/asistencias.service';
import { Asistencia } from 'src/app/Models/asistencia.model';

@Component({
  selector: 'app-planillas-form',
  templateUrl: './planillas-form.component.html',
  styleUrls: ['./planillas-form.component.scss']
})
export class PlanillasFormComponent implements OnInit {

  public formulario: FormGroup;
  public status: string;
  formularioSuccess: boolean = false;
  loading: boolean = true;
  modoEditar: boolean = false;

  cursos: Curso[];

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private planillaService: PlanillasService,
    private cursoService: CursosService,
    private asistenciaService: AsistenciasService) {
  }

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    const planilla_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);

    this.formulario = this.createForm(planilla_id);
  }

  //obtiene el valor de los componentes en el formulario
  get planilla_id() { return this.formulario.get('planilla_id'); }
  get fecha() { return this.formulario.get('fecha'); }
  get curso() { return this.formulario.get('curso'); }
  get curso_id() { return this.formulario.get('curso_id'); }

  createForm(planilla_id) {
    if (planilla_id) {
      this.planillaService.getPlanilla(planilla_id).subscribe(
        planilla => (
          this.formulario = new FormGroup({
            planilla_id: new FormControl({ value: planilla.planilla_id, disabled: true }),
            fecha: new FormControl(planilla.fecha, [Validators.required]),
            curso: new FormControl(planilla.curso),
            curso_id: new FormControl({ value: planilla.curso.curso_id, disabled: true }, [Validators.required]),
          }),
          this.getCursosDiferentes(planilla.curso_id),
          this.loading = false
        ),
        err => {
          alert(`planilla no encontrado (${planilla_id}):\n` +
            `${err.message}`)
          this.volverAlListado()
        }
      )
    } else {
      this.loading = false;
      this.getCursos();
      return new FormGroup({
        fecha: new FormControl(null, [Validators.required]),
        curso: new FormControl(null),
        curso_id: new FormControl(null, [Validators.required]),
      });
    }
  }

  onSaveForm() {
    if (this.formulario.valid && !this.modoEditar) {
      this.planillaService.postPlanilla(this.formulario.value).subscribe(
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
      this.planillaService.updatePlanilla(this.formulario.value)
        .subscribe(
          (data) => {
            if (data == "Success") {
              this.mostrarAlerta();
              // this.crearAsistencias();
            } else {
              alert(data);
            }
          },
        )
    }
  }

  // crearAsistencias() {
  //   this.curso.value.alumnos.forEach(alumno => {
  //     var asistencia: Asistencia = {
  //       asistio: false,
  //       planilla_id: this.planilla_id.value,
  //       alumno_id: alumno.alumno_id
  //     }

  //     this.asistenciaService.postAsistencia(asistencia).subscribe(data => {
  //       if (data == "Success") {
  //         this.mostrarAlerta();
  //       } else {
  //         alert(data);
  //       }
  //     }) // cierra subscribe
  //   }); // cierra foreach
  // }



  getCursosDiferentes(curso_id) {
    this.cursoService.getCursosDiferentes(curso_id).subscribe(data => {
      this.cursos = data;
    })
  }

  getCursos() {
    this.cursoService.getAllCursos().subscribe(data => {
      this.cursos = data;
    })
  }

  onResetForm() {
    this.formulario.reset();
  }

  private mostrarAlerta() {
    this.formularioSuccess = true;
    setTimeout(() => {
      this.formularioSuccess = false;
      this.volverAlListado();
    }, 2000);
  }

  private volverAlListado() {
    this._router.navigate(['/planillas', 'list'])
  }

}
