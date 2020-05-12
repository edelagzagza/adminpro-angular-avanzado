import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from './../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = '';  //
  imagenSubir: File; // sin inicializar, así cuando carga el controlador, estará vacía, null, o undefine
  imagenTemp: string | ArrayBuffer;

  constructor( public subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService ) {}

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this.modalUploadService.ocultarModal();
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


  subirImagen() {
    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id )
          .then( resp => {
            // console.log( resp );
            this.modalUploadService.notificacion.emit( resp );
            // this.modalUploadService.ocultarModal(); // con esta instrucción no estaba borrando la imagen del Modal
            this.cerrarModal();
          })
          .catch( err => {
            console.log( 'Error en la carga...' );
          });
  }

}
