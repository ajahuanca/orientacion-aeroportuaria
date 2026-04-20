import { Injectable, signal } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { ClaseDetectada, TeachableMetadata } from '../models/clase-detectada.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloOrientacionService {
  private model: tf.LayersModel | null = null;
  private metadata: TeachableMetadata | null = null;
  private readonly modelUrl = 'assets/model/model.json';
  private readonly metadataUrl = 'assets/model/metadata.json';

  readonly ultimaDeteccion = signal<ClaseDetectada | null>(null);

  private readonly classConfig: Record<string, Omit<ClaseDetectada, 'confidence'>> = {
    senal_direccion_area_check_in: {
      key: 'senal_direccion_area_check_in',
      label: 'Área de check-in',
      message: 'Se detecta dirección hacia el área de check-in.',
      icon: 'bi-box-arrow-in-right',
      group: 'Orientación primaria'
    },
    senal_direccion_puerta_embarque: {
      key: 'senal_direccion_puerta_embarque',
      label: 'Puerta de embarque',
      message: 'Se detecta dirección hacia puertas de embarque.',
      icon: 'bi-sign-turn-right',
      group: 'Orientación primaria'
    },
    senal_direccion_control_seguridad: {
      key: 'senal_direccion_control_seguridad',
      label: 'Control de seguridad',
      message: 'Se detecta dirección hacia control de seguridad.',
      icon: 'bi-shield-lock',
      group: 'Orientación primaria'
    },
    senal_direccion_salida_terminal: {
      key: 'senal_direccion_salida_terminal',
      label: 'Salida de terminal',
      message: 'Se detecta dirección de salida de terminal.',
      icon: 'bi-door-open',
      group: 'Orientación primaria'
    },
    senal_acceso_banos_pasajeros: {
      key: 'senal_acceso_banos_pasajeros',
      label: 'Baños de pasajeros',
      message: 'Se detecta acceso a baños para pasajeros.',
      icon: 'bi-person-wheelchair',
      group: 'Servicios'
    },
    senal_punto_informacion_aeroportuaria: {
      key: 'senal_punto_informacion_aeroportuaria',
      label: 'Punto de información',
      message: 'Se detecta punto de información aeroportuaria.',
      icon: 'bi-info-circle',
      group: 'Servicios'
    },
    senal_acceso_ascensor: {
      key: 'senal_acceso_ascensor',
      label: 'Ascensor',
      message: 'Se detecta acceso a ascensor.',
      icon: 'bi-badge-ad',
      group: 'Movilidad'
    },
    senal_acceso_escaleras: {
      key: 'senal_acceso_escaleras',
      label: 'Escaleras',
      message: 'Se detecta acceso a escaleras.',
      icon: 'bi-distribute-vertical',
      group: 'Movilidad'
    },
    senal_direccion_recojo_equipaje: {
      key: 'senal_direccion_recojo_equipaje',
      label: 'Recojo de equipaje',
      message: 'Se detecta dirección hacia recojo de equipaje.',
      icon: 'bi-briefcase',
      group: 'Equipaje'
    },
    senal_direccion_conexion_vuelos: {
      key: 'senal_direccion_conexion_vuelos',
      label: 'Conexión de vuelos',
      message: 'Se detecta dirección hacia zona de conexiones.',
      icon: 'bi-arrow-left-right',
      group: 'Movilidad'
    },
    senal_acceso_sala_espera: {
      key: 'senal_acceso_sala_espera',
      label: 'Sala de espera',
      message: 'Se detecta acceso a sala de espera.',
      icon: 'bi-hourglass-split',
      group: 'Servicios'
    },
    entorno_sin_senal_relevante: {
      key: 'entorno_sin_senal_relevante',
      label: 'Sin referencia útil',
      message: 'No se detecta una señal relevante en este momento.',
      icon: 'bi-ban',
      group: 'Negativa'
    }
  };

  async cargarModelo(): Promise<void> {
    if (this.model && this.metadata) {
      return;
    }

    this.model = await tf.loadLayersModel(this.modelUrl);

    const response = await fetch(this.metadataUrl);
    this.metadata = (await response.json()) as TeachableMetadata;
  }

  obtenerEtiquetas(): string[] {
    return this.metadata?.labels ?? Object.keys(this.classConfig);
  }

  async predecirDesdeImagen(imagen: HTMLImageElement): Promise<ClaseDetectada> {
    if (!this.model) {
      throw new Error('El modelo no fue cargado.');
    }

    const labels = this.obtenerEtiquetas();

    const tensor = tf.browser
      .fromPixels(imagen)
      .resizeBilinear([224, 224])
      .toFloat()
      .div(255)
      .expandDims(0);

    const prediction = this.model.predict(tensor) as tf.Tensor;
    const values = Array.from(await prediction.data()) as number[];

    tensor.dispose();
    prediction.dispose();

    const maxIndex = values.reduce(
      (bestIndex, currentValue, currentIndex, array) =>
        currentValue > array[bestIndex] ? currentIndex : bestIndex,
      0
    );

    const predictedKey = labels[maxIndex] ?? 'entorno_sin_senal_relevante';
    const confidence = Number((values[maxIndex] ?? 0).toFixed(4));

    const base =
      this.classConfig[predictedKey] ?? this.classConfig['entorno_sin_senal_relevante'];

    const result: ClaseDetectada = {
      ...base,
      confidence
    };

    this.ultimaDeteccion.set(result);
    return result;
  }

  guardarDeteccion(detection: ClaseDetectada): void {
    this.ultimaDeteccion.set(detection);
  }
}
