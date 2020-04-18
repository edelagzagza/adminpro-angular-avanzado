import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';    // para cambiar nombre en página del browser

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;  // propiedad para comunicarse con el html definida en el archivo de rutas
  descripcion: string;  // propiedad para comunicarse con el html definida en el archivo de rutas

  constructor( private router: Router, private title: Title, private meta: Meta ) {
    // this.router.events.pipe(    // se pasó a la función para no tener tanto código en el constructor
    //   filter( evento => evento instanceof ActivationEnd ),    // instanceof es función  de JavaScript
    //   filter( (evento: ActivationEnd ) => evento.snapshot.firstChild === null ),
    //   map( (evento: ActivationEnd ) => evento.snapshot.data )
    // )
    this.getDataRoute()    // se remplazo por este llamado
    .subscribe( data => {
      // console.log( data );
      // this.titulo = data.titulo;      // está definido en el archivo de rutas
      this.descripcion = data.descripcion;
      this.title.setTitle( this.titulo );    // cambiar título de la página en el browser

      const metaTag: MetaDefinition = {    // con esto se define el metaTag
        name: 'description',
        // content: this.titulo    // se puede agregar una descrición en el archivo de rutas
        content: this.descripcion
      };

      this.meta.updateTag( metaTag );  // con esto se actauliza en el html

    });

    // .subscribe( evento => {    // fue utilizado para probar el observable de la ruta
    //   console.log( evento );
    // })
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),    // instanceof es función  de JavaScript
      filter( (evento: ActivationEnd ) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd ) => evento.snapshot.data )
    )
  }

}
