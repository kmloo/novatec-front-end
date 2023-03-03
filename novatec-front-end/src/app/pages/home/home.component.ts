import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Especialidad } from '../../model/especialidad.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  redirectAlumno(): void{
    this.router.navigate(['alumno']);
  }

  redirectProfesor(): void{
    this.router.navigate(['profesor']);
  }

}
