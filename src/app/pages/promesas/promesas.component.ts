import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {
    // let promesa = new Promise((resolve, reject) => {
    //   let contador = 0;
    //   let intervalo = setInterval(() => {
    //     contador += 1;
    //     console.log(contador);
    //     if (contador === 3) {
    //       // resolve();               // sin mensaje
    //       // reject('Llegó al 3');
    //       resolve('OK');              // con mensaje
    //       clearInterval(intervalo);
    //     }
    //   }, 1000);
    // });

    // promesa.then(                                  // resolve
    //   // () => console.log('Terminó')              // sin mensaje
    //   mensaje => console.log('Terminó', mensaje)  // con mensaje
    // )
    // .catch (                                       // reject
    //   error => console.log('Error en la promesa', error)
    // );

    this.contarTres().then(                        // resolve
      // () => console.log('Terminó')             // sin mensaje
      mensaje => console.log('Terminó', mensaje)  // con mensaje
    )
    .catch (                                       // reject
      error => console.log('Error en la promesa', error)
    );
   }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    // let promesa = new Promise((resolve, reject) => {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          // resolve();               // sin mensaje
          // reject('Llegó al 3');
          resolve(true);              // con mensaje
          clearInterval(intervalo);
        }
      }, 1000);
    });
    // return promesa;
  }

}
