import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import { ModeloOrientacionService } from 'src/app/services/modelo-orientacion.service';


@Component({
    selector: 'app-results',
    templateUrl: './results.page.html',
    styleUrls: ['./results.page.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent]
})
export class ResultsPage {
    private readonly modeloService = inject(ModeloOrientacionService);

    readonly deteccion = computed(() => this.modeloService.ultimaDeteccion());

    readonly recomendaciones = [
        'Validar detección en múltiples cuadros consecutivos.',
        'Aplicar umbral mínimo de confianza antes de emitir voz.',
        'Evitar repetición constante de anuncios al usuario.'
    ];
}
