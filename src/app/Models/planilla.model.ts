import { Asistencia } from "./asistencia.model";
import { Curso } from "./curso.model";

export interface Planilla {
    planilla_id?: number;
    fecha: Date | string;

    curso_id?: number;
    curso?: Curso;

    asistencias?: Asistencia;
}