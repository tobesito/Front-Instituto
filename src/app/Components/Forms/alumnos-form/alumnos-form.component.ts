import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/Services/alumnos.service';
//Reactive Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.scss']
})
export class AlumnosFormComponent implements OnInit {

  // public keyword = "Nombre";
  public formulario: FormGroup;
  public status: string;
  formularioSuccess: boolean = false;
  loading: boolean = true;
  modoEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private alumnoService: AlumnosService) {
  }

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    const alumno_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);

    this.formulario = this.createForm(alumno_id);
  }

  //obtiene el valor de los componentes en el formulario
  get nombre() { return this.formulario.get('nombre'); }
  get legajo() { return this.formulario.get('legajo'); }
  get dni() { return this.formulario.get('dni'); }

  createForm(alumno_id) {
    if (alumno_id) {
      this.alumnoService.getAlumno(alumno_id).subscribe(
        alumno => (
          this.formulario = new FormGroup({
            alumno_id: new FormControl(alumno.alumno_id),
            nombre: new FormControl(alumno.nombre, [Validators.required, Validators.minLength(5)]),
            legajo: new FormControl(alumno.legajo, [Validators.required]),
            dni: new FormControl(alumno.dni, [Validators.required]),
          }),
          this.loading = false
        ),
        err => {
          alert(`alumno no encontrado (${alumno_id}):\n` +
            `${err.message}`)
          this.volverAlListado()
        }
      )
    } else {
      this.loading = false;
      return new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
        legajo: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required]),
      });
    }
  }

  onSaveForm() {
    if (this.formulario.valid && !this.modoEditar) {
      this.alumnoService.postAlumno(this.formulario.value).subscribe(
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
      this.alumnoService.updateAlumno(this.formulario.value)
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
    this._router.navigate(['/alumnos', 'list'])
  }
}
