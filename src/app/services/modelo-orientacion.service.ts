import { Injectable, signal } from '@angular/core';
import { ClaseDetectada } from 'src/app/models/clase-detectada.model';


@Injectable({
    providedIn: 'root'
})
export class ModeloOrientacionService {
    private readonly clases: ClaseDetectada[] = [
        {
            key: 'senal_direccion_area_check_in',
            label: 'Área de check-in',
            confidence: 0,
            message: 'Se detecta dirección hacia el área de check-in.',
            icon: 'bi-box-arrow-in-right',
            group: 'Orientación primaria'
        },
        {
            key: 'senal_direccion_puerta_embarque',
            label: 'Puerta de embarque',
            confidence: 0,
            message: 'Se detecta dirección hacia puertas de embarque.',
            icon: 'bi-sign-turn-right',
            group: 'Orientación primaria'
        },
        {
            key: 'senal_direccion_control_seguridad',
            label: 'Control de seguridad',
            confidence: 0,
            message: 'Se detecta dirección hacia control de seguridad.',
            icon: 'bi-shield-lock',
            group: 'Orientación primaria'
        },
        {
            key: 'senal_direccion_salida_terminal',
            label: 'Salida de terminal',
            confidence: 0,
            message: 'Se detecta dirección de salida de terminal.',
            icon: 'bi-door-open',
            group: 'Orientación primaria'
        },
        {
            key: 'senal_acceso_banos_pasajeros',
            label: 'Baños de pasajeros',
            confidence: 0,
            message: 'Se detecta acceso a baños para pasajeros.',
            icon: 'bi-person-wheelchair',
            group: 'Servicios'
        },
        {
            key: 'senal_punto_informacion_aeroportuaria',
            label: 'Punto de información',
            confidence: 0,
            message: 'Se detecta punto de información aeroportuaria.',
            icon: 'bi-info-circle',
            group: 'Servicios'
        },
        {
            key: 'senal_acceso_ascensor',
            label: 'Ascensor',
            confidence: 0,
            message: 'Se detecta acceso a ascensor.',
            icon: 'bi-badge-ad',
            group: 'Movilidad'
        },
        {
            key: 'senal_acceso_escaleras',
            label: 'Escaleras',
            confidence: 0,
            message: 'Se detecta acceso a escaleras.',
            icon: 'bi-distribute-vertical',
            group: 'Movilidad'
        },
        {
            key: 'senal_direccion_recojo_equipaje',
            label: 'Recojo de equipaje',
            confidence: 0,
            message: 'Se detecta dirección hacia recojo de equipaje.',
            icon: 'bi-briefcase',
            group: 'Equipaje'
        },
        {
            key: 'senal_direccion_conexion_vuelos',
            label: 'Conexión de vuelos',
            confidence: 0,
            message: 'Se detecta dirección hacia zona de conexiones.',
            icon: 'bi-arrow-left-right',
            group: 'Movilidad'
        },
        {
            key: 'senal_acceso_sala_espera',
            label: 'Sala de espera',
            confidence: 0,
            message: 'Se detecta acceso a sala de espera.',
            icon: 'bi-hourglass-split',
            group: 'Servicios'
        },
        {
            key: 'entorno_sin_senal_relevante',
            label: 'Sin referencia útil',
            confidence: 0,
            message: 'No se detecta una señal relevante en este momento.',
            icon: 'bi-ban',
            group: 'Negativa'
        }
    ];

    readonly ultimaDeteccion = signal<ClaseDetectada | null>(null);

    obtenerClases(): ClaseDetectada[] {
        return this.clases;
    }

    async cargarModelo(): Promise<void> {
        // Aquí luego se integrará TensorFlow.js y el modelo exportado.
        await Promise.resolve();
    }

    async simularPrediccion(): Promise<ClaseDetectada> {
        const indice = Math.floor(Math.random() * this.clases.length);
        const base = this.clases[indice];

        const detection: ClaseDetectada = {
            ...base,
            confidence: Number((Math.random() * 0.2 + 0.78).toFixed(2))
        };

        this.ultimaDeteccion.set(detection);
        return detection;
    }

    guardarDeteccion(detection: ClaseDetectada): void {
        this.ultimaDeteccion.set(detection);
    }
}
