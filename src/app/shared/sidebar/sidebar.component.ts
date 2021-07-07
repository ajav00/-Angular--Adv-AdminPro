import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public usuario: Usuario;

  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
    // console.log(sidebarService.menu);
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
