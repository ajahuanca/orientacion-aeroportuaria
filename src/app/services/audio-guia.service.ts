import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioGuiaService {
    private synthesis = window.speechSynthesis;
    private ultimaFrase = '';
    private ultimoTiempo = 0;
    private readonly cooldownMs = 2500;

    hablar(texto: string): void {
        const ahora = Date.now();

        if (!texto?.trim()) {
            return;
        }

        if (this.ultimaFrase === texto && ahora - this.ultimoTiempo < this.cooldownMs) {
            return;
        }

        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-ES';
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;

        this.synthesis.speak(utterance);

        this.ultimaFrase = texto;
        this.ultimoTiempo = ahora;
    }

    detener(): void {
        this.synthesis.cancel();
    }
}
