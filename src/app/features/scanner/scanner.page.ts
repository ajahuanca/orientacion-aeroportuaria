import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
    imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent]
})
export class ScannerPage implements AfterViewInit, OnDestroy {
    @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

    private readonly modeloService = inject(ModeloOrientacionService);
    private readonly audioService = inject(AudioGuiaService);
    private readonly cameraService = inject(CameraAccesoService);
    private readonly router = inject(Router);

    stream: MediaStream | null = null;
    camaraActiva = false;
    cargando = false;
    deteccionActual: ClaseDetectada | null = null;

    readonly recomendaciones = [
        'Mantén el móvil estable durante el escaneo.',
        'Apunta la cámara hacia la señalética frontal.',
        'Evita obstrucciones y contraluces intensos.'
    ];

    async ngAfterViewInit(): Promise<void> {
        await this.modeloService.cargarModelo();
    }

    async iniciarCamara(): Promise<void> {
        if (this.camaraActiva) {
            return;
        }

        try {
            this.stream = await this.cameraService.solicitarAcceso(this.videoRef.nativeElement);
            this.camaraActiva = true;
        } catch (error) {
            console.error('No se pudo acceder a la cámara', error);
        }
    }

    detenerCamara(): void {
        this.cameraService.detenerStream(this.stream);
        this.stream = null;
        this.camaraActiva = false;
    }

    async escanearAhora(): Promise<void> {
        this.cargando = true;

        try {
            const resultado = await this.modeloService.simularPrediccion();
            this.deteccionActual = resultado;

            if (resultado.key !== 'entorno_sin_senal_relevante') {
                this.audioService.hablar(resultado.message);
            }

            this.router.navigate(['/results']);
        } finally {
            this.cargando = false;
        }
    }

    ngOnDestroy(): void {
        this.detenerCamara();
        this.audioService.detener();
    }
}
