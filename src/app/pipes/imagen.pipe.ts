import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
    // return null;

  transform( img: string, tipo: string = 'usuario' ): any {
    let url = URL_SERVICIOS + '/imagenes';

    if ( !img ) {
      return url + '/usuario/xxx';  // regresa nada para que aparezca la imagen por default
    }

    if ( img.indexOf( 'https' ) >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('Tipo de imagen no existe - usuario, medicos, hospitales');
        url += '/usuario/xxx';
    }

    return url;
  }

}
