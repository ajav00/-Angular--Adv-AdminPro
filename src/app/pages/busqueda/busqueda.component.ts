import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';
import { Medico } from '../../models/medico.interface';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  constructor(private activatedRoute: ActivatedRoute, private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({termino}) =>{
      console.log(termino);
      this.busquedaGlobal(termino);
    })
  }

  busquedaGlobal(termino: string){
    this.busquedasService.busquedaGlobal(termino)
                .subscribe((resp: any) => {
                  console.log(resp);
                  this.usuarios = resp.usuario;
                  this.hospitales = resp.hospital;
                  this.medicos = resp.medico
                  console.log(this.usuarios);
                })
  }

}
