import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})


export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File; // sin inicializar, así cuando carga el controlador, estará vacía, null, o undefine
  imagenTemp: string | ArrayBuffer;

  constructor( public usuarioService: UsuarioService ) {
    this.usuario = this.usuarioService.usuario;  // en la función del constructor es opcional usar el this
  }


  ngOnInit() {
  }


  guardar( usuario: Usuario ) {
    this.usuario.nombre = usuario.nombre;
    if( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actualizarUsuario( this.usuario )
        .subscribe();

  }


  seleccionImagen( archivo: File ) {  // desde el momento que se cambió en el html a $event.target.files[0]
    // podemos cambiar en los parámetros de "evento" a un archivo "archivo: File"
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf( 'image' ) < 0 ) {
      Swal.fire({
        title: 'Sólo imágenes',
        text: 'Archivo seleccionado no es imagen',
        icon: 'error'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;  // después de aquí ya puedo mandar ejecutar la función para cargar... pero antes queremos hacer un preview

    let reader = new FileReader();      // puro Vanilla JavaScript
    let urlImagenTemp = reader.readAsDataURL( archivo );  // puro Vanilla JavaScript

    reader.onloadend = () => this.imagenTemp = reader.result;

  }


  cambiarImagen() {
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
