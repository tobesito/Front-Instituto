import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from 'src/app/Services/profesores.service';
//Reactive Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profesores-form',
  templateUrl: './profesores-form.component.html',
  styleUrls: ['./profesores-form.component.scss']
})
export class ProfesoresFormComponent implements OnInit {

  public formulario: FormGroup;
  public status: string;
  formularioSucces: boolean = false;
  loading: boolean = true;
  modoEditar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private profesorService: ProfesoresService) {
  }

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    const profesor_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);

    this.formulario = this.createForm(profesor_id);
  }

  //obtiene el valor de los componentes en el formulario
  get nombre() { return this.formulario.get('nombre'); }
  get titulo() { return this.formulario.get('titulo'); }
  get dni() { return this.formulario.get('dni'); }

  createForm(profesor_id) {
    if (profesor_id) {
      this.profesorService.getProfesor(profesor_id).subscribe(
        profesor => (
          this.formulario = new FormGroup({
            profesor_id: new FormControl(profesor.profesor_id),
            nombre: new FormControl(profesor.nombre, [Validators.required, Validators.minLength(5)]),
            titulo: new FormControl(profesor.titulo, [Validators.required]),
            dni: new FormControl(profesor.dni, [Validators.required]),
          }),
          this.loading = false
        ),
        err => {
          alert(`profesor no encontrado (${profesor_id}):\n` +
            `${err.message}`)
          this.volverAlListado()
        }
      )
    } else {
      this.loading = false;
      return new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
        titulo: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required]),
      });
    }
  }

  onSaveForm() {
    if (this.formulario.valid && !this.modoEditar) {
      this.profesorService.postProfesor(this.formulario.value).subscribe(
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
      this.profesorService.updateProfesor(this.formulario.value)
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
    this.formularioSucces = true;
    setTimeout(() => {
      this.formularioSucces = false;
      this.volverAlListado();
    }, 2000);
  }

  private volverAlListado() {
    this._router.navigate(['/profesores', 'list'])
  }

}
