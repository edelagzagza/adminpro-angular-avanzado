import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initPlugin();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor( public router: Router, public usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    initPlugin();
    this.googleInit();

    this.email = localStorage.getItem( 'email' ) || '';
    if ( this.email.length > 2 ) {
      this.recuerdame = true;
    }
  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '865864447765-32e7hqmp003r87n0jqtati6c6m2q3u7t.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById( 'btnGoogle' ));
    });
  }


  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      // console.log( token );

      this.usuarioService.loginGoogle( token )
          // .subscribe( resp => {
          //   this.router.navigate(['/dashboard']);
          //   console.log( resp );
          // })
          // .subscribe( () => this.router.navigate(['/dashboard'])); // esto es lo mismo que lo anterior

          .subscribe( () => window.location.href = '#/dashboard');  // esta es la manera de quitar el error del refresh
          // de la página al ser redireccionado a dashboard... pero dejaré la del error. Esto fue con Vanilla JavaScript
    });
  }


  ingresar( forma: NgForm ) {
    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );

    this.usuarioService.login( usuario, forma.value.recuerdame )
        .subscribe( resp => {
          this.router.navigate(['/dashboard']);
        });

    // console.log( forma.value );
    // this.router.navigate(['/dashboard']);
  }

}
