import { Injectable } from '@angular/core';
import { Planilla } from '../Models/planilla.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanillasService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getPlanilla(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/planillas/${id}`);
  }

  getAllPlanillas(): Observable<any> {
    return this.http.get(`${this.backEndURL}/planillas`);
  }

  postPlanilla(planilla: Planilla) {
    return this.http.post(`${this.backEndURL}/planillas`,planilla);
  }

  updatePlanilla(planilla: Planilla) {
    return this.http.put(`${this.backEndURL}/planillas/${planilla.planilla_id}`,planilla);
  }

  deletePlanilla(id: number) {
    return this.http.delete(`${this.backEndURL}/planillas/${id}`);
  }

  ///:curso_id/:alumno_id/:fecha
  getPlanillaFecha(curso_id: number, alumno_id, fecha: Date): Observable<any> {
    return this.http.get(`${this.backEndURL}/planillas/${curso_id}/${alumno_id}/${fecha}`);
  }
}
