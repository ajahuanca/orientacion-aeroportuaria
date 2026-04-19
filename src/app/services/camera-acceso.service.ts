import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CameraAccesoService {
    async solicitarAcceso(video: HTMLVideoElement): Promise<MediaStream> {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error('La cámara no está soportada en este dispositivo o navegador.');
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            },
            audio: false
        });

        video.srcObject = stream;
        await video.play();

        return stream;
    }

    detenerStream(stream: MediaStream | null): void {
        if (!stream) {
            return;
        }

        stream.getTracks().forEach((track) => track.stop());
    }
}
