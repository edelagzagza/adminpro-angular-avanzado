import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public subirService: SubirArchivoService ) {
    this.cargarStorage();
  }


  estaLogueado() {
    return ( this.token.length > 20 ) ? true : false;
  }


  cargarStorage() {
    if ( localStorage.getItem( 'token' )) {
      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }


  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));

    this.usuario = usuario;
    this.token = token;
  }


  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token: token } )   // no puedo mandar un string,
    // tengo que mandar un objeto... por eso { token: token }... pude mandar sólo { token }
            .pipe
            (map( (resp: any) => {
              this.guardarStorage( resp.id, resp.token, resp.usuario );
              return true;
            }));
  }


  login( usuario: Usuario, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
            .pipe
            (map( (resp: any) => {
              // localStorage.setItem( 'id', resp.id );    // creamos una función para guardar en Storage
              // localStorage.setItem( 'token', resp.token );
              // localStorage.setItem( 'usuario', JSON.stringify( resp.usuario ));
              this.guardarStorage( resp.id, resp.token, resp.usuario );
              return true;
            }));
  }


  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );

    this.router.navigate(['/login']);
  }


  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
            .pipe
            (map( (resp: any) => {
              Swal.fire({
                title: 'Usuario creado',
                text: usuario.email,
                icon: 'success'
              });
              return resp.usuario;
            }));
  }


  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    // console.log( 'URL ', url );
    // console.log( usuario );

    return this.http.put( url, usuario )
            .pipe
            (map( ( resp: any ) => {
              if ( usuario._id === this.usuario._id ) {  // este se agregó cuando hicimos actualizar Role / lo de adentro ya estaba
                // this.usuario = resp.usuario;  // al llamar guardarStorage estaba de más
                this.guardarStorage( resp.usuario._id, this.token, resp.usuario );
              }
              Swal.fire({
                title: 'Usuario creado',
                text: usuario.nombre,
                icon: 'success'
              });

              return true;
            }));
  }


  cambiarImagen( archivo: File, id: string ) {
    this.subirService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {
          // console.log( resp );
          this.usuario.img = resp.usuario.img;
          Swal.fire({
            title: 'Imagen actualizada',
            text: this.usuario.nombre,
            icon: 'success'
          });
          this.guardarStorage( id, this.token, this.usuario );
        })
        .catch( resp => {
          console.log( resp );
        });
  }


  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }


  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
                .pipe
                (map (( resp: any ) => resp.usuarios ));

  }


  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url );
  }

}
