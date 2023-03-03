import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { Especialidad } from '../../model/especialidad.model';
import { Profesor } from '../../model/profesor.model';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-dialog-profesor',
  templateUrl: './dialog-profesor.component.html',
  styleUrls: ['./dialog-profesor.component.scss']
})
export class DialogProfesorComponent implements OnInit {

  profesor: Profesor;
  titulo: string;
  form: FormGroup;
  especialidades: Especialidad[];
  edit: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profesor,
    private service: ServiceService,
    private fb: FormBuilder,
    private snackBar: SnackBarService
  ) {
    this.getEspecialidades();
    if (data) {
      this.profesor = data;
      this.titulo = `Editar profesor ${this.profesor.nombre} ${this.profesor.apellido}`;
      this.edit = true;
    } else {
      this.profesor = new Profesor();
      this.titulo = `Crear profesor `;
      this.edit = false;
    }
    this.createForm();
  }

  ngOnInit(): void {
  }

  getEspecialidades(): void {
    this.service.getEspecialidades().subscribe((data: Especialidad[]) => {
      if (data) {
        this.especialidades = data;
      } else {
        this.snackBar.openWarningSnackBar('No se encontraron datos.');
      }
    }, (err) => {
      this.snackBar.openFailureSnackBar('Message archived');
    });
  }

  createForm(): void {
    this.form = this.fb.group({
      nombre: [this.profesor.nombre, [Validators.required]],
      apellido: [this.profesor.apellido, [Validators.required]],
      clase: [this.profesor.idEspecialidad, [Validators.required]]
    });
  }

  procees(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(group => group.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else if (this.edit) {
      this.profesor.nombre = this.form.get('nombre').value;
      this.profesor.apellido = this.form.get('apellido').value;
      this.profesor.idEspecialidad = this.form.get('clase').value;

      this.service.editProfesor(this.profesor).subscribe((edito: boolean) => {
        if (edito) {
          this.snackBar.openSuccessSnackBar(`Se ha editado el profesor ${this.profesor.nombre} ${this.profesor.apellido}.`);
          this.cerrarDialogo(true);
        } else {
          this.snackBar.openWarningSnackBar(`No se ha editado el profesor, vuelva a intentarlo`);
        }
      }, (err) => {
        this.snackBar.openFailureSnackBar(`Ha ocurrido un error editando al profesor, vuelva a intentarlo.`);
      });
    } else {
      this.profesor.nombre = this.form.get('nombre').value;
      this.profesor.apellido = this.form.get('apellido').value;
      this.profesor.idEspecialidad = this.form.get('clase').value;

      this.service.createProfesor(this.profesor).subscribe((profe: Profesor) => {
        if (profe) {
          this.snackBar.openSuccessSnackBar(`Se ha creado el profesor ${profe.nombre} ${profe.apellido}.`);
          this.cerrarDialogo(true);
        } else {
          this.snackBar.openWarningSnackBar(`No se ha creado el profesor, vuelva a intentarlo`);
        }
      }, (err) => {
        this.snackBar.openFailureSnackBar(`Ha ocurrido un error creando al profesor, vuelva a intentarlo.`);
      });
    }
  }

  nombreNoValido(): boolean {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  apellidoNoValido(): boolean {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  claseNoValido(): boolean {
    return this.form.get('clase').invalid && this.form.get('clase').touched;
  }

  cerrarDialogo(action: boolean): void {
    this.dialogRef.close(action);
  }


}
