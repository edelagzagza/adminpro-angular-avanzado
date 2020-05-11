import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );
      xhr.onreadystatechange = function() {  // todo esto es la petición AJAX como va a funcionar
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Falló la subida' );
            reject( xhr.response );
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open( 'PUT', url, true );
      xhr.send( formData );


    });
  }
}

/*  Este módulo de subir, servirá para cualquier tipo de archivo
    Angular todavía una instrucción como el http.post para subir un archivo
    por eso se usa en este servicio, Vanilla JavaScript */
