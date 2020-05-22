import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
  menu: any[] = [];

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
      this.menu = JSON.parse( localStorage.getItem( 'menu' ) );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }


  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));
    localStorage.setItem( 'menu', JSON.stringify( menu ));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }


  loginGoogle( token: string ) {
    console.log('loginGoogle');
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token: token } )   // no puedo mandar un string,
    // tengo que mandar un objeto... por eso { token: token }... pude mandar sólo { token }
            .pipe
            (map( (resp: any) => {
              this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
              console.log( resp );
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
              this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
              return true;
            }),
              catchError( err => {
                // console.log(err.status);
                // console.log(err.error.mensaje);
                Swal.fire({
                  title: 'Error en el login',
                  text: err.error.mensaje,
                  icon: 'error'
                });
                return throwError(err.message);
              })
            );
  }


  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    localStorage.removeItem( 'menu' );

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
            }),
              catchError( err => {
                // console.log(err.status);
                // console.log(err.error.mensaje);
                Swal.fire({
                  title: err.error.mensaje,
                  text: err.error.errors.message,
                  icon: 'error'
                });
                return throwError(err.message);
              })
            );
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
                this.guardarStorage( resp.usuario._id, this.token, resp.usuario, this.menu );
              }
              Swal.fire({
                title: 'Usuario creado',
                text: usuario.nombre,
                icon: 'success'
              });

              return true;
            }),
              catchError( err => {
                // console.log(err.status);
                // console.log(err.error.mensaje);
                Swal.fire({
                  title: err.error.mensaje,
                  text: err.error.errors.message,
                  icon: 'error'
                });
                return throwError(err.message);
              })
            );
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
          this.guardarStorage( id, this.token, this.usuario, this.menu );
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
