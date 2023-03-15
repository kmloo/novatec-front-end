import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { Especialidad } from '../../model/especialidad.model';
import { SnackBarService } from '../../service/snack-bar.service';
import { Profesor } from '../../model/profesor.model';
import { stringify } from 'querystring';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfesorComponent } from '../../dialog/dialog-profesor/dialog-profesor.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss']
})
export class ProfesorComponent implements OnInit {

  especialidades: Especialidad[] = [];

  profesores: Profesor[] = [];

  displayedColumns: string[] = ['identificador', 'nombre', 'apellido', 'materia', 'editar', 'eliminar'];
  dataSource: any;

  constructor(
    private service: ServiceService,
    private snackBar: SnackBarService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getEspecialidades();
    this.getProfesores();
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

  getProfesores(): void {
    this.profesores = [];
    this.service.getProfesores().subscribe((data: Profesor[]) => {
      if (data && data.length > 0) {
        this.profesores = data;
        this.dataSource = this.profesores;
      } else {
        this.dataSource = this.profesores;
        this.snackBar.openWarningSnackBar('No se encontraron profesores.');
      }
    }, (err) => {
      this.snackBar.openFailureSnackBar('Error consultando los profesores.');
    });
  }

  getEspecialidad(idEspecialidad: number): string {
    let nombre: string;
    if (this.especialidades) {
      this.especialidades.forEach((espe: Especialidad) => {
        if (espe.id === idEspecialidad) {
          nombre = espe.nombre;
        }
      });
    }
    return nombre;
  }

  delete(id: number, nombre: string, apellido: string): void {
    const snackBar = this.snackBar.openWarningSnackBar(`Va a eliminar el profesor ${nombre} ${apellido}`);

    this.service.deleteProfesor(id).subscribe((data: boolean) => {
      if (data) {
        this.snackBar.openSuccessSnackBar(`Se elimino el profesor ${nombre} ${apellido}`);
        this.getProfesores();
      } else {
        this.snackBar.openWarningSnackBar(`No se encontro un profesor ${nombre} ${apellido}`);
      }
    }, (err) => {
      this.snackBar.openFailureSnackBar(`Error eliminando al profesor ${nombre} ${apellido}`);
    });
  }

  add(): void {
    const dialog = this.dialog.open(DialogProfesorComponent, {
      data: null,
    });

    dialog.afterClosed().subscribe(result => {
      this.getProfesores();
    });
  }

  edit(profe: Profesor): void {
    const dialog = this.dialog.open(DialogProfesorComponent, {
      data: profe,
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.getProfesores();
      }
    });
  }

  regresar(): void{
    this.router.navigate(['home']);
  }

}
