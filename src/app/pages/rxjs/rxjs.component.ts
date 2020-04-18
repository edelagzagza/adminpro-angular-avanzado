import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs/Rx';    // así está en el curso, pero a mí me da error
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcionObs: Subscription; // propiedad para mantener referencia al observador y poderlo destruir

  constructor() {
    // let obs = new Observable( observer => {
    //   let contador = 0;
    //   let intervalo = setInterval( () => {
    //     contador += 1;
    //     observer.next( contador );
    //     if (contador === 3) {
    //       clearInterval( intervalo );
    //       observer.complete();
    //     } else {
    //       if (contador === 2) {
    //         clearInterval( intervalo );
    //         observer.error('Auxilio');
    //       }
    //     }
    //   }, 1000);
    // });

    // obs.subscribe( recibeNumero => {
    //   console.log( 'Subs ', recibeNumero )
    // });

    // obs.pipe(
    // this.regresaObservable().pipe(
    //   retry(2)
    // )

    this.subscripcionObs = this.regresaObservable()  // agregar para poder unsubscribe al observable
    // this.regresaObservable()
    .subscribe(
      recibeNumero => console.log('Subs ', recibeNumero),
      error => console.error('Error en el obs ', error),
      () => console.log('El observador terminó')
    );

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Saliendo de página');
    this.subscripcionObs.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    // let obs = new Observable( observer => {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval( () => {
        // console.log(contador);
        contador += 1;

        const salida = {
          valor: contador
        };
        // observer.next( contador );
        observer.next( salida );

        // if (contador === 3) {          // documentado cuando ya estoy haciendo el OnDestroy
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval( intervalo );
        //   observer.error('Auxilio');
        // }

      }, 1000);
    // });
    }).pipe(
      map( resp => {            // map( resp => resp.valor )
        return resp.valor;
      }),
      filter( ( valor, index ) => {
        // console.log('Filter ', valor, index);
        if (valor % 2 === 1 ) {
          // impar
          return true;
        } else {
          return false;
        }
        // return true;
      })
    );
    // return obs;
  }

}
