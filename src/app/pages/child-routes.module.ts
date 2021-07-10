import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Guards
import { AdminGuard } from '../guards/admin.guard';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

//Mantenimientos
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';

const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Temas'} },
  { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Búsquedas'} },
  { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
  { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica 1'} },
  { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'} },
  { path: 'profile', component: ProfileComponent, data: {titulo: 'Ajustes de Cuenta'} },
  
  //Mantenimientos
  { path: 'usuarios', canActivate:[ AdminGuard ], component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'} },
  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Médicos'} },
  { path: 'medicos/medico/:id', canActivate:[ AdminGuard ], component: MedicoComponent, data: {titulo: 'Mantenimiento de Médicos'} },

];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
