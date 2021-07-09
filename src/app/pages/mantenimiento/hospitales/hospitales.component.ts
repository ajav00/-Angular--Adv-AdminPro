import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs$: Subscription;

  public hospitalesTemp: Hospital[];

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs$ = this.modalImagenService.nuevaImagen
    .pipe(
      delay(200)
    )
    .subscribe((resp)=>{
      // console.log(resp);
      this.cargarHospitales();
    })
  }

  ngOnDestroy(): void {
    this.imgSubs$.unsubscribe();
  }
  
  
  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
            .subscribe(hospitales => {
              this.hospitales = hospitales;
              this.cargando = false;
            });
  }

  guardarHospital(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital.nombre, hospital._id)
                      .subscribe((resp)=>{
                        Swal.fire('Actualizado', hospital.nombre, 'success');
                        
                      })
  }
  
  eliminarHospital(hospital: Hospital){
    this.hospitalService.borrarHospital(hospital._id)
                      .subscribe((resp)=>{
                        this.cargarHospitales()
                        Swal.fire('Eliminado', hospital.nombre, 'success');
                      })
  }
  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: "Ingrese el nombre del hospital",
      showCancelButton: true,
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear'
    })

    if(value.trim().length > 0){
      this.hospitalService.crearHospital(value)
            .subscribe((resp: any)=>{
              this.hospitales.push(resp.hospital)
            })
    }
  }


  abrirModal(hospital: Hospital){
    console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string){
    // console.log(termino);
    if(termino.length === 0){
      return this.hospitales = this.hospitalesTemp;
    }
    this.busquedasService.buscar('hospitales', termino)
                  .subscribe( (resp: Hospital[]) => {
                    // console.log(resp);
                    this.hospitales = resp;
                  })
  }


}
