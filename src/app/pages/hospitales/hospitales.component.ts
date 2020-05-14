import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

// declare var Swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor( public hospitalService: HospitalService, public modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales() );
  }


  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.hospitalService.buscarHospital( termino )
        .subscribe( hospitales => this.hospitales = hospitales );
  }


  cargarHospitales() {
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales );
  }


  guardarHospital( hospital: Hospital ) {
    this.hospitalService.actualizarHospital( hospital )
        .subscribe();
  }


  borrarHospital( hospital: Hospital ) {
    this.hospitalService.borrarHospital( hospital._id )
        .subscribe( () => this.cargarHospitales() );
  }


  crearHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear!!',
      icon: 'info',
    }) .then(( valor: any ) => {
        console.log( valor );
        if ( valor.dismiss === 'cancel' || valor.value === '') {
          return;
        }
        this.hospitalService.crearHospital( valor.value )
            .subscribe( () => this.cargarHospitales() );
    });
  }


  actualizarImagen( hospital: Hospital ) {
      this.modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

}
