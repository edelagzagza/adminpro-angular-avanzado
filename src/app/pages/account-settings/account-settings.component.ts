import { Component, OnInit, Inject, ElementRef } from '@angular/core';
// import { DOCUMENT } from '@angular/common';    // esto me lo lleve a settings service
// import { DOCUMENT } from '@angular/platform-browser';   // esto usa en el curso
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // constructor( @Inject(DOCUMENT) private _document, public _ajustes: SettingsService ) { }    // usando TypeScript
  constructor( public _ajustes: SettingsService ) { }
  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    // console.log(link);

    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );
  }

  aplicarCheck( link: any ) {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;

    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
