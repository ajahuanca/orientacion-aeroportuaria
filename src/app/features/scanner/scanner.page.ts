import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ClaseDetectada } from 'src/app/models/clase-detectada.model';
import { AudioGuiaService } from 'src/app/services/audio-guia.service';
import { CameraAccesoService } from 'src/app/services/camera-acceso.service';
import { ModeloOrientacionService } from 'src/app/services/modelo-orientacion.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent]
})
export class ScannerPage implements OnInit, OnDestroy {
  private readonly modeloService = inject(ModeloOrientacionService);
  private readonly audioService = inject(AudioGuiaService);
  private readonly cameraService = inject(CameraAccesoService);
  private readonly router = inject(Router);

  camaraActiva = false;
  cargando = false;
  deteccionActual: ClaseDetectada | null = null;
  errorCarga = '';

  readonly recomendaciones = [
    'Mantén el móvil estable durante el escaneo.',
    'Apunta la cámara hacia la señalética frontal.',
    'Evita obstrucciones y contraluces intensos.'
  ];

  async ngOnInit(): Promise<void> {
    try {
      await this.modeloService.cargarModelo();
    } catch (error) {
      console.error(error);
      this.errorCarga = 'No se pudo cargar el modelo de clasificación.';
    }
  }

  async iniciarCamara(): Promise<void> {
    if (this.camaraActiva) {
      return;
    }

    try {
      this.errorCarga = '';

      await new Promise((resolve) => setTimeout(resolve, 150));
      await this.cameraService.iniciarPreview();

      this.camaraActiva = true;
    } catch (error) {
      console.error('No se pudo acceder a la cámara', error);
      this.errorCarga = 'No se pudo acceder a la cámara del dispositivo.';
    }
  }

  async detenerCamara(): Promise<void> {
    try {
      await this.cameraService.detenerPreview();
    } catch (error) {
      console.error('Error al detener la cámara', error);
    } finally {
      this.camaraActiva = false;
    }
  }

  async escanearAhora(): Promise<void> {
    if (!this.camaraActiva) {
      this.errorCarga = 'Activa la cámara antes de ejecutar el escaneo.';
      return;
    }

    this.cargando = true;
    this.errorCarga = '';

    try {
      const base64 = await this.cameraService.capturar();

      if (!base64) {
        throw new Error('No se pudo capturar la imagen.');
      }

      const imagen = await this.base64ToImage(`data:image/jpeg;base64,${base64}`);
      const resultado = await this.modeloService.predecirDesdeImagen(imagen);

      this.deteccionActual = resultado;

      if (
        resultado.key !== 'entorno_sin_senal_relevante' &&
        resultado.confidence >= 0.51
      ) {
        await this.audioService.hablar(resultado.message);
      }

      await this.detenerCamara();
      await this.router.navigate(['/results']);
    } catch (error) {
      console.error(error);
      this.errorCarga = 'Ocurrió un error al procesar la imagen capturada.';
    } finally {
      this.cargando = false;
    }
  }

  private base64ToImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('No se pudo convertir la captura en imagen.'));
      img.src = src;
    });
  }

  async ngOnDestroy(): Promise<void> {
    await this.detenerCamara();
  }
}
