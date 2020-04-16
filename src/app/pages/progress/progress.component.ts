import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 40;


  constructor() { }

  ngOnInit(): void {
  }

  /* Este código lo mandé al componente Incrementador */
  /* cambiarValor( valor ) {
    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
  } */


  /* Esta función la remplazo por (cambioValor)="progreso1 = $event" en el html
  y en el html estaba (cambioValor)="actualizarValor($event)" con esta función
  que estoy documentando*/

  /* actualizarValor(evento: number) {
    console.log('Evento: ', evento);
    // this.progreso1 = evento;
  } */
}
