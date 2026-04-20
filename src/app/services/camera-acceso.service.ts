import { Injectable } from '@angular/core';
import { CameraPreview } from '@capacitor-community/camera-preview';

@Injectable({
  providedIn: 'root'
})
export class CameraAccesoService {
  async iniciarPreview(): Promise<void> {
    const container = document.getElementById('cameraPreview');

    if (!container) {
      throw new Error('No se encontró el contenedor de cámara.');
    }

    const rect = container.getBoundingClientRect();
    const scrollY = window.scrollY || 0;

    await CameraPreview.start({
      parent: 'cameraPreview',
      className: 'camera-preview',
      position: 'rear',
      toBack: false,
      x: Math.round(rect.left),
      y: Math.round(rect.top + scrollY),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      enableZoom: false
    });
  }

  async capturar(): Promise<string | undefined> {
    const result = await CameraPreview.capture({
      quality: 85
    });

    return result.value;
  }

  async detenerPreview(): Promise<void> {
    try {
      await CameraPreview.stop();
    } catch (error) {
      console.warn('No se pudo detener el preview o ya estaba detenido.', error);
    }
  }
}
