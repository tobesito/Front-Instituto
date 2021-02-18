import { Alumno } from "./alumno.model";
import { Profesor } from "./profesor.model";

export interface Curso {
    curso_id?: number;
    nombre: string;
    fecha_inicio: Date | string;
    fecha_fin: Date | string;
    cantidad_alumnos: number;

    profesor_id?: number;
    profesor?: Profesor;

    profesor_auxiliar_id?: number;
    profesor_auxiliar?: Profesor;

    alumnos?: Alumno[];
}