import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.interface';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ id }) => this.cargarMedico(id))
    
    this.medicoForm = this.fb.group({
      nombre: ['Hernando', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
              .subscribe(hospitalId => {
                if(this.hospitales){
                  this.hospitalSeleccionado = this.hospitales.
                                    find(h => h._id === hospitalId)
                }
              })
  }


  cargarMedico(id: string){

    if(id === 'nuevo'){
      return ;
    }
    this.medicoService.obtenerMedicoPorId(id)
            .pipe(
              delay(150)
            )
            .subscribe((medico)=>{
        
              
              if(!medico){
                this.router.navigateByUrl('dashboard/medicos');
              }
              const {nombre, hospital:{_id}} = medico;
        
              this.medicoSeleccionado = medico;
              this.medicoForm.setValue({nombre, hospital: _id});
        
            })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
              .subscribe((hospitales)=>{
                this.hospitales = hospitales;
              });
  }

  guardarMedico(){

    const {nombre} = this.medicoForm.value;

    if(this.medicoSeleccionado){//Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
      .subscribe((resp)=>{
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');                  
      })
    }
    else{ //Crear
      console.log(this.medicoForm.value);
      this.medicoService.crearMedico(this.medicoForm.value)
                          .subscribe((resp: any)=>{
                            // console.log(resp);
                            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
                            this.router.navigateByUrl(`/dashboard/medicos/medico/${resp.medico._id}`)
                          })
    }
  }

}
