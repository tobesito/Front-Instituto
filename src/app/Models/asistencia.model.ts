import { Alumno } from "./alumno.model";
import { Planilla } from "./planilla.model";

export interface Asistencia {
    asistencia_id?: number;
    asistio: boolean;

    planilla_id?: number;
    planilla?: Planilla;

    alumno_id?: number;
    alumno?: Alumno; 
}