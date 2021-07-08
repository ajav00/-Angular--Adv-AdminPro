import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];
  public desde: number = 0;
  public cargando: boolean = true;
  private imgSubs$: Subscription;

  constructor(private usuarioService: UsuarioService, 
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs$ = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe((resp)=>{
      // console.log(resp);
      this.cargarUsuarios();
    })
  }

  ngOnDestroy(): void {
    this.imgSubs$.unsubscribe();
  }
  
  cargarUsuarios(){
    // console.log('Entre');
    this.cargando = true;
    
    this.usuarioService.cargarUsuarios(this.desde)
          .subscribe(({ total, usuarios }) => {
              console.log(usuarios);
              this.totalUsuarios = total;
              this.usuarios = usuarios;
              this.usuariosTemp = usuarios;
              this.cargando = false;
          });

  }


  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }
    else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    
    // console.log(this.desde);
    this.cargarUsuarios();
  }

  

  buscar(termino: string){
    // console.log(termino);
    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios', termino)
                  .subscribe( (resp) => {
                    this.usuarios = resp;
                  })
  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Está seguro?',
      icon: 'question',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      showDenyButton: true,
      confirmButtonText: `Si, Borrar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp => {
              this.cargarUsuarios();
              Swal.fire('Usuario Borrado',
                          `${ usuario.nombre } fue eliminado correctamente`, 
                          'success')
            });
      } 
    })

  }


  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
            .subscribe(console.log)
  }

  abrirModal(usuario: Usuario){
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
