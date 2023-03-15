import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesorComponent } from './pages/profesor/profesor.component';

const routes: Routes = [
  {path: 'profesor', component: ProfesorComponent},
  { path: '', pathMatch: 'full', redirectTo: 'profesor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
