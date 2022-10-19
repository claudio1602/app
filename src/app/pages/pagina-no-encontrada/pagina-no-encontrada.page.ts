// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-pagina-no-encontrada',
//   templateUrl: './pagina-no-encontrada.page.html',
//   styleUrls: ['./pagina-no-encontrada.page.scss'],
// })
// export class PaginaNoEncontradaPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, Optional } from '@angular/core';
import { IonRouterOutlet, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-no-encontrada',
  templateUrl: './pagina-no-encontrada.page.html',
  styleUrls: ['./pagina-no-encontrada.page.scss'],
})
export class PaginaNoEncontradaPage {
  constructor(
    @Optional() private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController
  ) {}

  public volverAtras(): void {
    if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      this.navCtrl.setDirection('back');
      this.routerOutlet.pop();
    } else {
      this.navCtrl.navigateBack('/home');
    }
  }
}