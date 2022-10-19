import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNoEncontradaPage } from './pagina-no-encontrada.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaNoEncontradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaNoEncontradaPageRoutingModule {}
