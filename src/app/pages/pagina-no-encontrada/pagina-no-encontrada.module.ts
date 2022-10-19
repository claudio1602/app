import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaNoEncontradaPageRoutingModule } from './pagina-no-encontrada-routing.module';

import { PaginaNoEncontradaPage } from './pagina-no-encontrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaNoEncontradaPageRoutingModule
  ],
  declarations: [PaginaNoEncontradaPage]
})
export class PaginaNoEncontradaPageModule {}
