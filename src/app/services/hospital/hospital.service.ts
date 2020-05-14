import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from './../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor( public http: HttpClient, public usuarioService: UsuarioService ) { }


  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get( url )
          .pipe
          (map (( resp: any ) => {
            this.totalHospitales = resp.total;
            return resp.hospitales;
          }));
  }


  obtenerHospital ( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
          .pipe
          // (map (( resp: any ) => resp.hospital ));  // marca warning - pide las llaves
          (map (( resp: any ) => {
            return resp.hospital;
          }));
  }


  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete( url )
          .pipe
          (map( resp => {
            Swal.fire({
              title: 'Hospital borrado',
              text: 'Eliminado correctamente',
              icon: 'success'
            });
          }));
  }


  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;
    console.log( url );
    console.log( nombre );

    return this.http.post( url, { nombre } )  // este objeto { nombre: nombre } se puede reducir a...
          .pipe
          (map (( resp: any ) => {
            // console.log( resp );
            // return;
            return resp.hospital;
          }));
  }


  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
                .pipe
                (map (( resp: any ) => resp.hospitales ));
  }


  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put( url, hospital )
          .pipe
          (map(( resp: any ) => {
            Swal.fire({
              title: hospital.nombre,
              text: 'Actualizado correctamente',
              icon: 'success'
            });
            return resp.hospital;
          }));
  }

}
