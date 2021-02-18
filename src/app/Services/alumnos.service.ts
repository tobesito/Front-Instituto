import { Injectable } from '@angular/core';
import { Alumno } from '../Models/alumno.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getAlumno(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/alumnos/${id}`);
  }

  getAllAlumnos(): Observable<any> {
    return this.http.get(`${this.backEndURL}/alumnos`);
  }

  postAlumno(alumno: Alumno) {
    return this.http.post(`${this.backEndURL}/alumnos`,alumno);
  }

  updateAlumno(alumno: Alumno) {
    return this.http.put(`${this.backEndURL}/alumnos/${alumno.alumno_id}`,alumno);
  }

  deleteAlumno(id: number) {
    return this.http.delete(`${this.backEndURL}/alumnos/${id}`);
  }
}
