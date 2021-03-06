import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];
  /* menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Médicos', url: '/medicos' },
        { titulo: 'Usuarios', url: '/usuarios' }
      ]
    }
  ]; */

  constructor( public usuarioService: UsuarioService ) {}


  cargarMenu() {
    this.menu = this.usuarioService.menu;
  }
}
