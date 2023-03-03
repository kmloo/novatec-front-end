import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/model/alumno.model';
import { ServiceService } from '../../service/service.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlumnoComponent } from '../../dialog/dialog-alumno/dialog-alumno.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  alumnos: Alumno[] = [];

  displayedColumns: string[] = ['identificador', 'nombre', 'apellido', 'curso', 'editar', 'eliminar'];
  dataSource: any;

  constructor(
    private service: ServiceService,
    private snackBar: SnackBarService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos(): void {
    this.alumnos = [];
    this.service.getAlumnos().subscribe((data: Alumno[]) => {
      if (data && data.length > 0) {
        this.alumnos = data;
        this.dataSource = this.alumnos;
      } else {
        this.snackBar.openWarningSnackBar('No se encontraron alumnos.');
      }
    }, (err) => {
      this.snackBar.openFailureSnackBar('Error consultando los alumnos.');
    });
  }

  delete(id: number, nombre: string, apellido: string): void {
    const snackBar = this.snackBar.openWarningSnackBar(`Va a eliminar el alumno ${nombre} ${apellido}`);

    this.service.deleteAlumno(id).subscribe((data: boolean) => {
      if (data) {
        this.snackBar.openSuccessSnackBar(`Se elimino el alumno ${nombre} ${apellido}`);
        this.getAlumnos();
      } else {
        this.snackBar.openWarningSnackBar(`No se encontro un alumno ${nombre} ${apellido}`);
      }
    }, (err) => {
      this.snackBar.openFailureSnackBar(`Error eliminando al alumno ${nombre} ${apellido}`);
    });
  }

  add(): void {
    const dialog = this.dialog.open(DialogAlumnoComponent, {
      data: null,
    });

    dialog.afterClosed().subscribe(result => {
      this.getAlumnos();
    });
  }

  edit(alumno: Alumno): void {
    const dialog = this.dialog.open(DialogAlumnoComponent, {
      data: alumno,
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.getAlumnos();
      }
    });
  }

  regresar(): void{
    this.router.navigate(['home']);
  }

}
