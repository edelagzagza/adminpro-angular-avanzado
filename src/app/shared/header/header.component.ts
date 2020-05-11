import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuarioRef: Usuario;

  constructor( public usuarioService: UsuarioService ) { }


  ngOnInit(): void {
    this.usuarioRef = this.usuarioService.usuario;
  }


  salir() {
    this.usuarioService.logout();
  }

}
