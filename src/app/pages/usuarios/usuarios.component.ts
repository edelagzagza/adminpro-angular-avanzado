import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})


export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;

  constructor( public usuarioService: UsuarioService, public modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.modalUploadService.notificacion
        .subscribe( () => this.cargarUsuarios() );
  }


  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
        .subscribe( (resp: any) => {
          // console.log( resp );
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });
  }


  cambiarDesde( valor: number ) {
    let desdeTemp = this.desde + valor;
    console.log( desdeTemp );

    if ( desdeTemp >= this.totalRegistros ) {
      return;
    }

    if ( desdeTemp < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }


  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    // console.log( termino );
    this.usuarioService.buscarUsuarios( termino )
        .subscribe( ( usuarios: Usuario[] ) => {
          // console.log( usuarios );
          this.usuarios = usuarios;
          this.cargando = false;
        });
  }


  borrarUsuario( usuario: Usuario ) {
    // console.log( usuario._id );
    // console.log( this.usuarioService);
    if ( usuario._id === this.usuarioService.usuario._id ) {
      Swal.fire({
        title: 'No se puede borrar usuario',
        text: 'No se puede borrar a si mismo',
        icon: 'error'
      });
      return;
    }

    Swal.fire({
      title: 'Estás seguro?',
      text: 'Estás a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      console.log( result );
      if (result.value) {
        this.usuarioService.borrarUsuario( usuario._id )
            .subscribe( resp => {
              console.log( resp );
              this.cargarUsuarios();
            });

        Swal.fire(
          'Borrado!',
          'El usuario ha sido borrado',
          'success'
        );
      }
    });
  }


  guardarUsuario( usuario: Usuario ) {
    this.usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }


  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal( 'usuarios', id );
  }

}
