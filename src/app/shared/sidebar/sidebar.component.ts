import { Component, OnInit } from '@angular/core';
// import { SidebarService } from 'src/app/services/service.index';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor( public sidebar: SidebarService, public usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

  salir() {
    this.usuarioService.logout();
  }

}
