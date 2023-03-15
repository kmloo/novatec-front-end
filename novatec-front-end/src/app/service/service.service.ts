import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
   * Edita un objeto profesor
   * @param profesor , objeto profesor
   * @returns boolean
   */
  editProfesor(profesor: Profesor): Observable<boolean> {
    return this.http.patch<boolean>(`${this.urlBase}/teacher`, profesor);
  }

}
