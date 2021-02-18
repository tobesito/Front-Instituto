import { Injectable } from '@angular/core';
import { Profesor } from '../Models/profesor.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private http: HttpClient) {
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getProfesor(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/profesores/${id}`);
  }

  getAllProfesores(): Observable<any> {
    return this.http.get(`${this.backEndURL}/profesores`);
  }

  postProfesor(profesor: Profesor) {
    return this.http.post(`${this.backEndURL}/profesores`, profesor);
  }

  updateProfesor(profesor: Profesor) {
    return this.http.put(`${this.backEndURL}/profesores/${profesor.profesor_id}`, profesor);
  }

  deleteProfesor(id: number) {
    return this.http.delete(`${this.backEndURL}/profesores/${id}`);
  }

  getProfesoresDiferentes(profesor_id: number, profesor_auxiliar_id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/profesores/${profesor_id}/${profesor_auxiliar_id}`);
  }
}
