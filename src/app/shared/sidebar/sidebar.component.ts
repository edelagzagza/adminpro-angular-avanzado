import { Component, OnInit } from '@angular/core';
// import { SidebarService } from 'src/app/services/service.index';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuarioRef: Usuario;

  constructor( public sidebar: SidebarService, public usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.usuarioRef = this.usuarioService.usuario;
    this.sidebar.cargarMenu();
  }

  salir() {
    this.usuarioService.logout();
  }

}
