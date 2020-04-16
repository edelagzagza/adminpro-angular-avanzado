import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  // se puede cambiar el nombre de la variable de "leyenda" a "nombre"
  // "nombre" está en el componente padre - progress.component.html
  // tslint:disable-next-line:no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  // se puede cambiar el nombre de la variable de "cambioValor" a "valorCambio"
  // "valorCambio" está en el componente padre - progress.component.html
  // tslint:disable-next-line:no-output-rename
  @Output('valorCambio') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda constructor', this.leyenda);
    // console.log('Progreso constructor', this.progreso);
   }

  ngOnInit(): void {
    // console.log('Leyenda OnInit', this.leyenda);
    // console.log('Progreso OnInit', this.progreso);
  }

  conCambios( nuevoNumero: number ) {
    // Al agregar @ViewChild se pueden eliminar los siguientes 3 renglones
    // let elementoHtml: any = document.getElementsByName('progreso')[0];  // esto es javascript
    // console.log(elementoHtml.value);    // esto es javascript
    // console.log( this.txtProgress );

    // console.log( nuevoNumero );
    if ( nuevoNumero >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoNumero <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoNumero;
    }

    // Al agregar @ViewChild se puede eliminar el siguiente renglón
    // elementoHtml.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );
  }



  cambiarValor( valor ) {
    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();    // poner el foco en el elemento que estoy inc
  }

}
