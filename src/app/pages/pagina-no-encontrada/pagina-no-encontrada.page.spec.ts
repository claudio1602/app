import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaNoEncontradaPage } from './pagina-no-encontrada.page';

describe('PaginaNoEncontradaPage', () => {
  let component: PaginaNoEncontradaPage;
  let fixture: ComponentFixture<PaginaNoEncontradaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaNoEncontradaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaNoEncontradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
