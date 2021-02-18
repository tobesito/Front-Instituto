import { Injectable } from '@angular/core';
import { Curso } from '../Models/curso.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getCurso(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/cursos/${id}`);
  }

  getAllCursos(): Observable<any> {
    return this.http.get(`${this.backEndURL}/cursos`);
  }

  postCurso(curso: Curso) {
    return this.http.post(`${this.backEndURL}/cursos`,curso);
  }

  updateCurso(curso: Curso) {
    return this.http.put(`${this.backEndURL}/cursos/${curso.curso_id}`,curso);
  }

  deleteCurso(id: number) {
    return this.http.delete(`${this.backEndURL}/cursos/${id}`);
  }

  getCursosDiferentes(curso_id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/cursos/diferentes/${curso_id}`);
  }
}
