import { Component, Inject, OnInit } from '@angular/core';
import { Alumno } from '../../model/alumno.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../../service/service.service';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-dialog-alumno',
  templateUrl: './dialog-alumno.component.html',
  styleUrls: ['./dialog-alumno.component.scss']
})
export class DialogAlumnoComponent implements OnInit {

  alumno: Alumno;
  titulo: string;
  form: FormGroup;
  edit: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    private service: ServiceService,
    private fb: FormBuilder,
    private snackBar: SnackBarService
  ) {
    if (data) {
      this.alumno = data;
      this.titulo = `Editar alumno ${this.alumno.nombre} ${this.alumno.apellido}`;
      this.edit = true;
    } else {
      this.alumno = new Alumno();
      this.titulo = `Crear Alumno `;
      this.edit = false;
    }
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.form = this.fb.group({
      nombre: [this.alumno.nombre, [Validators.required]],
      apellido: [this.alumno.apellido, [Validators.required]],
      curso: [this.alumno.curso, [Validators.required]]
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
      this.alumno.nombre = this.form.get('nombre').value;
      this.alumno.apellido = this.form.get('apellido').value;
      this.alumno.curso = this.form.get('curso').value;

      this.service.editAlumno(this.alumno).subscribe((edito: boolean) => {
        if (edito) {
          this.snackBar.openSuccessSnackBar(`Se ha editado el alumno ${this.alumno.nombre} ${this.alumno.apellido}.`);
          this.cerrarDialogo(true);
        } else {
          this.snackBar.openWarningSnackBar(`No se ha editado el alumno, vuelva a intentarlo`);
        }
      }, (err) => {
        this.snackBar.openFailureSnackBar(`Ha ocurrido un error editando al alumno, vuelva a intentarlo.`);
      });
    } else {
      this.alumno.nombre = this.form.get('nombre').value;
      this.alumno.apellido = this.form.get('apellido').value;
      this.alumno.curso = this.form.get('curso').value;

      this.service.createAlumno(this.alumno).subscribe((alum: Alumno) => {
        if (alum) {
          this.snackBar.openSuccessSnackBar(`Se ha creado el alumno ${alum.nombre} ${alum.apellido}.`);
          this.cerrarDialogo(true);
        } else {
          this.snackBar.openWarningSnackBar(`No se ha creado el alumno, vuelva a intentarlo`);
        }
      }, (err) => {
        this.snackBar.openFailureSnackBar(`Ha ocurrido un error creando al alumno, vuelva a intentarlo.`);
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
    return this.form.get('curso').invalid && this.form.get('curso').touched;
  }

  cerrarDialogo(action: boolean): void {
    this.dialogRef.close(action);
  }

}
