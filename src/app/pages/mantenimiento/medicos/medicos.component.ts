import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.interface';
import { Subscription } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs$: Subscription;

  public medicosTemp: Medico[];

  constructor(private medicoService: MedicoService,
              private busquedasService: BusquedasService, 
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs$ = this.modalImagenService.nuevaImagen
    .pipe(
      delay(200)
    )
    .subscribe((resp)=>{
      // console.log(resp);
      this.cargarMedicos();
    })
  }

  ngOnDestroy(): void {
    this.imgSubs$.unsubscribe();
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
            .subscribe(medicos => {
              console.log(medicos);
              this.medicos = medicos;
              this.medicosTemp = medicos;
              this.cargando = false;
            });
  }

  buscar(termino: string){
    if(termino.length === 0){
      return this.medicos = this.medicosTemp;
    }
    this.busquedasService.buscar('medicos', termino)
                  .subscribe( (resp: Medico[]) => {
                    this.medicos = resp;
                  })
  }

  abrirModal(medico: Medico){
    console.log(medico);
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedicos(medico: Medico){

    Swal.fire({
      title: '¿Está seguro?',
      icon: 'question',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      showDenyButton: true,
      confirmButtonText: `Si, Borrar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
            .subscribe(resp => {
              this.cargarMedicos();
              Swal.fire('Usuario Borrado',
                          `${ medico.nombre } fue eliminado correctamente`, 
                          'success')
            });
      } 
    })

  }

}
