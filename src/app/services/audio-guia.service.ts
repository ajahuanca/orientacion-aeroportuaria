import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Injectable({
  providedIn: 'root'
})
export class AudioGuiaService {
  private ultimaFrase = '';
  private ultimoTiempo = 0;
  private readonly cooldownMs = 2500;

  async hablar(texto: string): Promise<void> {
    const ahora = Date.now();

    if (!texto?.trim()) {
      return;
    }

    if (this.ultimaFrase === texto && ahora - this.ultimoTiempo < this.cooldownMs) {
      return;
    }

    await TextToSpeech.speak({
      text: texto,
      lang: 'es-ES',
      rate: 0.95,
      pitch: 1,
      volume: 1
    });

    this.ultimaFrase = texto;
    this.ultimoTiempo = ahora;
  }

  async detener(): Promise<void> {
    await TextToSpeech.stop();
  }
}
