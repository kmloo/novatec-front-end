import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../model/alumno.model';
import { Especialidad } from '../model/especialidad.model';
import { Profesor } from '../model/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlBase = 'http://localhost:8580/prueba-novatec/api/v1.0.0';

  constructor(private http: HttpClient) { }

  /**
   * Crea el profsor enviado
   * @param profesor, objeto
   * @returns, objecto creado
   */
  createProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.urlBase}/create/teacher`, profesor);
  }

  /**
   * Crea el alumno enviado
   * @param alumno, objeto
   * @returns, objecto creado
   */
  createAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.urlBase}/create/student`, alumno);
  }

  /**
   * Consulta los alumnos disponibles
   * @returns, objecto creado
   */
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.urlBase}/student`);
  }

  /**
   * Consulta los profesores disponibles
   * @returns, objecto creado
   */
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.urlBase}/teacher`);
  }

  /**
   * Consulta las especialidades disponibles
   * @returns, objecto consultado
   */
  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.urlBase}/resources/specialty`);
  }

  /**
   * Borra un profesor por su identificador
   * @param identificador, id del profesor
   * @returns, bolean
   */
  deleteProfesor(identificador: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.urlBase}/teacher/${identificador}`);
  }

  /**
   * Borra un alumno por su identificador
   * @param identificador , identificador del alumno
   * @returns , boolean
   */
  deleteAlumno(identificador: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.urlBase}/student/${identificador}`);
  }

  /**
   * Edita un objeto profesor
   * @param profesor , objeto profesor
   * @returns boolean
   */
  editProfesor(profesor: Profesor): Observable<boolean> {
    return this.http.patch<boolean>(`${this.urlBase}/teacher`, profesor);
  }

  /**
   * Edita un objeto alumno
   * @param alumno , objeto alumno
   * @returns boolean
   */
  editAlumno(alumno: Alumno): Observable<boolean> {
    return this.http.patch<boolean>(`${this.urlBase}/student`, alumno);
  }

}
