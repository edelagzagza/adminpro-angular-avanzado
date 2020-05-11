import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
// import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ImagenPipe
  ],
  imports: [
    // CommonModule
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
