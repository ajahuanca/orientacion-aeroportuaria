import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton]
})
export class HomePage {
    readonly metricas = [
        { titulo: 'Clases del sistema', valor: '12', icono: 'bi bi-diagram-3' },
        { titulo: 'Inferencia', valor: 'Local', icono: 'bi bi-cpu' },
        { titulo: 'Canal de guía', valor: 'Voz', icono: 'bi bi-volume-up' }
    ];

    readonly funcionalidades = [
        {
            icono: 'bi bi-camera-video',
            titulo: 'Reconocimiento visual en dispositivo',
            descripcion:
                'Procesa señalética aeroportuaria desde la cámara del móvil con una arquitectura orientada a baja latencia.'
        },
        {
            icono: 'bi bi-signpost-split',
            titulo: 'Orientación contextual inteligente',
            descripcion:
                'Convierte clases detectadas en mensajes funcionales alineados con el flujo operativo del pasajero.'
        },
        {
            icono: 'bi bi-universal-access',
            titulo: 'Diseño centrado en accesibilidad',
            descripcion:
                'Prioriza simplicidad de interacción, apoyo auditivo y una experiencia usable para personas con discapacidad visual.'
        }
    ];
}
