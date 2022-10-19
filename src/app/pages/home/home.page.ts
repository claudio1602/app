import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';



 import jsQR, { QRCode } from 'jsqr';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements AfterViewInit{

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('bienvenido', { read: ElementRef, static: true}) bienvenido: ElementRef;
  @ViewChild('desarrolladores', { read: ElementRef, static: true}) desarrolladores: ElementRef;

  @ViewChild('fileinput', { static: false })
  private fileinput: ElementRef;

  @ViewChild('video', { static: false })
  private video: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas: ElementRef;

  
  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = null;



  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';

  

  public usuario: Usuario;

  constructor(
    private activeroute: ActivatedRoute
  , private router: Router
  , private alertController: AlertController
  , private animationController: AnimationController
  , private loadingController: LoadingController) {


this.activeroute.queryParams.subscribe(params => {      
  if (this.router.getCurrentNavigation().extras.state) { 

    
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;

  } else {
  

    this.router.navigate(['ingreso']);
  }
});
}


public ngAfterViewInit(): void {
  const animation = this.animationController
    .create()
    .addElement(this.titulo.nativeElement)
    .iterations(Infinity)
    .duration(10000)
    .fromTo('transform', 'translate(-80%)', 'translate(100%)')
    //.fromTo("color", "red", "green")
    
  


    const animation2 = this.animationController
    .create()
    .addElement(this.bienvenido.nativeElement)
    .iterations(Infinity)
    .duration(1000)
    .fromTo("color", "red", "green", )



    const animation3 = this.animationController
    .create()
    .addElement(this.desarrolladores.nativeElement)
    .iterations(Infinity)
    .fill('none')
    .duration(4000)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.1, transform: 'scale(1.4)', opacity: '0.3' },
      { offset: 0.2, transform: 'scale(1)', opacity: '1' }
    ]);








  animation.play();
  animation2.play();
  animation3.play();
}






public ngOnInit(): void {
  //this.alumno.correo = 'atorres@duocuc.cl';
  //this.alumno.contraseña = '1234';
  //this.alumno.Nombre = 'Ana Torrez Leiva';
  //this.alumno.Frase_secreta = 'Nombre de su mascota';
  //this.alumno.respuesta = 'gato';
}


public cargarImagenDesdeArchivo(): void {
  this.limpiarDatos();
  this.fileinput.nativeElement.click();
}

public verificarArchivoConQR(files: FileList): void {
  const file = files.item(0);
  const img = new Image();
  img.onload = () => {
    this.obtenerDatosQR(img);
  };
  img.src = URL.createObjectURL(file);
}

public obtenerDatosQR(source?: CanvasImageSource): boolean {
  let w = 0;
  let h = 0;
  if (!source) {
    this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
    this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
  }

  w = this.canvas.nativeElement.width;
  h = this.canvas.nativeElement.height;
  //console.log(w + ' ' + h);

  const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
  context.drawImage(source? source : this.video.nativeElement, 0, 0, w, h);
  const img: ImageData = context.getImageData(0, 0, w, h);
  const qrCode: QRCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
  if (qrCode) {
    this.escaneando = false;
    this.datosQR = qrCode.data;
    this.mostrarDatosQROrdenados(this.datosQR);
  }
  return this.datosQR !== '';
}


public mostrarDatosQROrdenados(datosQR: string): void {
  const objetoDatosQR = JSON.parse(datosQR);
  this.bloqueInicio = objetoDatosQR.bloqueInicio;
  this.bloqueTermino = objetoDatosQR.bloqueTermino;
  this.dia = objetoDatosQR.dia;
    
  this.horaFin = objetoDatosQR.horaFin;
  this.horaInicio = objetoDatosQR.horaInicio;
  this.idAsignatura = objetoDatosQR.idAsignatura;
  this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
  this.nombreProfesor = objetoDatosQR.nombreProfesor;
  this.seccion = objetoDatosQR.seccion;
  this.sede = objetoDatosQR.sede;
}

  public detenerEscaneoQR(): void {
  this.escaneando = false;
}
public limpiarDatos(): void {
  this.escaneando = false;
  this.datosQR = '';
  this.loading = null;
  (document.getElementById('input-file') as HTMLInputElement).value = '';
}

  public async comenzarEscaneoQR() {
  this.limpiarDatos();
  const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'}
  });
  this.video.nativeElement.srcObject = mediaProvider;
  this.video.nativeElement.setAttribute('playsinline', 'true');
  this.loading = await this.loadingController.create({});
  await this.loading.present();
  this.video.nativeElement.play();
  requestAnimationFrame(this.verificarVideo.bind(this));
}

async verificarVideo() {
  if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
      this.escaneando = true;
    }
    if (this.obtenerDatosQR()) {
      console.log(1);
    } else {
      if (this.escaneando) {
        console.log(2);
        requestAnimationFrame(this.verificarVideo.bind(this));
      }
    }
  } else {
    console.log(3);
    requestAnimationFrame(this.verificarVideo.bind(this));
  }



}
}
