import { Injectable } from '@angular/core';
import { Asistencia } from '../Models/asistencia.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getAsistencia(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/asistencias/${id}`);
  }

  getAllAsistencias(): Observable<any> {
    return this.http.get(`${this.backEndURL}/asistencias`);
  }

  postAsistencia(asistencia: Asistencia) {
    return this.http.post(`${this.backEndURL}/asistencias`,asistencia);
  }

  updateAsistencia(asistencia: Asistencia) {
    return this.http.put(`${this.backEndURL}/asistencias/${asistencia.asistencia_id}`,asistencia);
  }

  deleteAsistencia(id: number) {
    return this.http.delete(`${this.backEndURL}/asistencias/${id}`);
  }
}
