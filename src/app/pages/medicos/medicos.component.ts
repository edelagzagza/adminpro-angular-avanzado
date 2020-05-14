import { Component, OnInit } from '@angular/core';
import { Medico } from './../../models/medico.model';
import { MedicoService } from './../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor( public medicoService: MedicoService, public modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }


  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedicos( termino )
        .subscribe( medicos => this.medicos = medicos );
  }


  cargarMedicos() {
    this.medicoService.cargarMedicos()
        .subscribe( (medicos: any) => this.medicos = medicos );
  }


  borrarMedico( medico: Medico ) {
    this.medicoService.borrarMedico( medico._id )
        .subscribe( () => this.cargarMedicos() );
  }

}
