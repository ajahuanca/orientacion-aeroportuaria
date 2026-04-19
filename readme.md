# Sistema Inteligente de Orientación Accesible para Personas con Discapacidad Visual en Entornos Aeroportuarios

Aplicación móvil desarrollada con **Ionic + Angular** orientada a mejorar la **autonomía de personas con discapacidad visual** en entornos aeroportuarios mediante **visión artificial**, **reconocimiento de señalética** y **retroalimentación auditiva**.

El sistema utiliza modelos entrenados con **Teachable Machine** y preparados para integrarse en el cliente móvil mediante **TensorFlow.js**, evitando depender de un backend para la inferencia en tiempo real. Esta decisión mejora la latencia, reduce el envío de imágenes a servicios externos y favorece una arquitectura más privada y escalable.

---

## 1. Objetivo del proyecto

Diseñar e implementar una solución móvil accesible capaz de:

- detectar señalética aeroportuaria relevante mediante la cámara del dispositivo,
- clasificar visualmente elementos del entorno utilizando un modelo de aprendizaje automático,
- traducir las detecciones en mensajes auditivos comprensibles,
- y apoyar la orientación de personas con discapacidad visual dentro de zonas clave del aeropuerto.

El proyecto se plantea como una solución de **orientación accesible asistida**, no como un sistema completo de navegación indoor con cálculo de rutas o posicionamiento de alta precisión.

---

## 2. Problema que resuelve

Los aeropuertos son entornos complejos, dinámicos y con alta carga visual. Para una persona con discapacidad visual, ubicar puntos clave como:

- área de **check-in**,
- **puertas de embarque**,
- **control de seguridad**,
- **salidas de terminal**,
- **baños**,
- **puntos de información**,
- **ascensores**,
- **escaleras**,
- **recojo de equipaje**,
- **conexión de vuelos**,
- o **salas de espera**

puede representar una barrera importante para su autonomía, seguridad y experiencia de viaje.

Esta aplicación busca disminuir esa dependencia de terceros mediante una capa tecnológica de asistencia basada en IA.

---

## 3. Características principales

- Reconocimiento visual de señalética aeroportuaria.
- Inferencia local en dispositivo móvil.
- Integración de cámara para escaneo del entorno.
- Retroalimentación auditiva orientada a accesibilidad.
- Diseño visual moderno, responsivo y de alto contraste.
- Arquitectura modular para facilitar mantenimiento y evolución.
- Base preparada para incorporar el modelo exportado desde Teachable Machine.

---

## 4. Arquitectura general

La solución está organizada bajo una arquitectura desacoplada, donde cada capa asume una responsabilidad específica:

### Capa de presentación
Implementada con **Ionic Angular**, contiene las vistas principales:

- `home`: pantalla institucional y punto de entrada.
- `scanner`: módulo de escaneo y reconocimiento.
- `results`: resumen de la última detección.

### Capa de servicios
Contiene la lógica funcional del sistema:

- `modelo-orientacion.service.ts`: carga del modelo, inferencia y mapeo de clases.
- `camera-acceso.service.ts`: acceso a cámara y gestión del stream.
- `audio-guia.service.ts`: síntesis de voz y control de repetición de mensajes.

### Capa de IA
Preparada para integrar el modelo exportado desde **Teachable Machine** mediante **TensorFlow.js**.

### Capa de accesibilidad
Transforma la predicción en mensajes auditivos claros, simples y funcionales.

---

## 5. Clases del sistema

Las clases definidas responden al flujo operativo del pasajero dentro del entorno aeroportuario.

### Grupo 1. Orientación primaria del pasajero
- `senal_direccion_area_check_in`
- `senal_direccion_puerta_embarque`
- `senal_direccion_control_seguridad`
- `senal_direccion_salida_terminal`

### Grupo 2. Servicios esenciales para orientación accesible
- `senal_acceso_banos_pasajeros`
- `senal_punto_informacion_aeroportuaria`
- `senal_acceso_ascensor`
- `senal_acceso_escaleras`

### Grupo 3. Flujo de equipaje y apoyo operativo
- `senal_direccion_recojo_equipaje`

### Grupo 4. Soporte de movilidad dentro de terminal
- `senal_direccion_conexion_vuelos`
- `senal_acceso_sala_espera`

### Grupo 5. Clase negativa obligatoria
- `entorno_sin_senal_relevante`

Esta última clase es importante para reducir falsos positivos y evitar mensajes incorrectos cuando no exista una referencia visual útil.

---

## 6. Tecnologías utilizadas

### Frontend móvil
- **Ionic**
- **Angular**
- **TypeScript**
- **SCSS**
- **Bootstrap 5**
- **Bootstrap Icons**

### Inteligencia artificial
- **Teachable Machine**
- **TensorFlow.js**
- **Machine Learning supervisado**

### Accesibilidad
- **SpeechSynthesis / Text-to-Speech**
- principios de usabilidad orientados a personas con discapacidad visual

### Entorno de ejecución
- **Node.js 22.15**
- **Ionic CLI**
- **Capacitor**

---

## 7. Requisitos previos

Asegúrate de tener instalado:

- **Node.js 22.15** o compatible
- **npm**
- **Ionic CLI**
- opcionalmente **Android Studio** para pruebas y compilación nativa

Instalación de Ionic CLI:

```bash
npm install -g @ionic/cli
```

---

## 8. Clonar el proyecto desde GitHub

Repositorio oficial:

```bash
git clone https://github.com/ajahuanca/orientacion-aeroportuaria.git
cd orientacion-aeroportuaria
```

Instalar dependencias:

```bash
npm install
```

---

## 9. Ejecución en desarrollo

Levantar la aplicación en modo desarrollo:

```bash
ionic serve
```

Esto abrirá la aplicación en el navegador para pruebas de interfaz, flujo visual y parte de la lógica funcional.

> Importante: cuando se usa cámara, audio o integración real con plugins nativos, debes probar también en Android, porque no todo el comportamiento del navegador representa fielmente el entorno móvil.

---

## 10. Dependencias UI incorporadas

Este proyecto utiliza **Bootstrap** y **Bootstrap Icons** para reforzar la presentación visual del sistema.

Instalación:

```bash
npm install bootstrap bootstrap-icons
```

---

## 11. Estructura del proyecto

```text
src/
├── app/
│   │   services/
│   │       ├── audio-guia.service.ts
│   │       ├── camera-acceso.service.ts
│   │       └── modelo-orientacion.service.ts
│   ├── features/
│   │   ├── results/
│   │   └── scanner/
│   ├── home/
│   ├── app.component.*
│   └── app.routes.ts
├── assets/
├── environments/
├── global.scss
└── theme/
```

---

## 12. Flujo funcional de la aplicación

1. El usuario ingresa a la pantalla principal.
2. Accede al módulo de escaneo.
3. Activa la cámara del dispositivo.
4. El sistema captura el entorno visual.
5. El modelo de IA procesa la imagen localmente.
6. Se obtiene una clase detectada con un nivel de confianza.
7. La lógica funcional interpreta la predicción.
8. El sistema emite una orientación auditiva asociada.
9. El resultado puede visualizarse en la pantalla de resultados.

---

## 13. Integración con Teachable Machine

El proyecto fue diseñado para trabajar con modelos exportados desde **Teachable Machine** en formato compatible con **TensorFlow.js**.

### Flujo recomendado
1. Entrenar el modelo en Teachable Machine.
2. Exportarlo como **TensorFlow.js**.
3. Copiar los archivos exportados dentro de `src/assets/model/`.
4. Cargar `model.json` desde el servicio de modelo.
5. Reemplazar la simulación actual por inferencia real.

### Archivos esperados del modelo
- `model.json`
- `metadata.json`
- archivos binarios de pesos

### Ubicación de los modelos

```text
src/assets/model/
├── model.json
├── metadata.json
└── weights.bin
```

---

## 14. Estado actual del proyecto

La base actual del sistema incluye:

- interfaz principal profesional,
- vista de escáner,
- vista de resultados,
- servicios base de cámara y audio,
- servicio de modelo con simulación de detección,
- estructura preparada para integrar TensorFlow.js,
- y diseño visual accesible con acciones principales ubicadas en la parte superior para facilitar la interacción.

### Pendiente inmediato
- integración real del modelo exportado de Teachable Machine,
- ejecución de inferencia sobre imágenes reales,
- validación de umbral de confianza,
- mejora de resultados consecutivos,
- y pruebas en dispositivo Android.

---

## 15. Accesibilidad y usabilidad

El diseño del sistema prioriza criterios de accesibilidad funcional:

- acciones principales visibles en la parte superior,
- reducción de fricción en navegación,
- retroalimentación auditiva clara,
- mensajes simples y contextuales,
- interfaz de alto contraste,
- y organización visual enfocada en tareas críticas.

### Enfoque de accesibilidad aplicado
- evitar sobrecarga de elementos secundarios,
- ubicar botones principales donde sean fácilmente localizables,
- separar funciones críticas de funciones auxiliares,
- reducir pasos para iniciar el escaneo,
- y apoyar la interacción con voz para disminuir dependencia visual.

---

## 16. Demostración de usabilidad

La aplicación puede ser demostrada bajo este escenario funcional:

1. Ingresar al sistema desde `home`.
2. Seleccionar **Ir al escáner** desde la zona superior de acciones.
3. Activar la cámara.
4. Simular o ejecutar la detección de una señal aeroportuaria.
5. Verificar la respuesta visual y auditiva.
6. Consultar la última detección en la pantalla de resultados.

### Casos de demostración sugeridos
- detección de **check-in**,
- detección de **puerta de embarque**,
- detección de **salida de terminal**,
- detección de **punto de información**,
- escena negativa con `entorno_sin_senal_relevante`.

---

## 17. Seguridad y buenas prácticas

### Decisiones de arquitectura adoptadas
- inferencia local para reducir latencia,
- separación de responsabilidades entre UI, cámara, IA y audio,
- no mezclar lógica de reconocimiento dentro de las vistas,
- evitar streaming continuo a backend para clasificación,
- control de repetición de mensajes auditivos.

### Riesgos a considerar
- falsos positivos si el dataset es insuficiente,
- saturación auditiva si no se controla la frecuencia de anuncios,
- confusión entre clases visualmente similares,
- sobreajuste si el modelo se entrena con fondos poco variados.

### Mejoras futuras recomendadas
- validación por múltiples frames consecutivos,
- umbral mínimo configurable,
- almacenamiento local de preferencias de accesibilidad,
- instrumentación de telemetría no sensible,
- pruebas con usuarios reales.

---

## 18. Pruebas en Android

Cuando quieras probar el proyecto en Android o generar APK:

```bash
ionic build
npx cap add android
npx cap sync android
npx cap open android
```

> `npx cap sync` requiere que la carpeta `www` exista. Por ello, primero debes ejecutar `ionic build`.

---

## 19. Roadmap técnico

### Fase 1
- base visual del sistema
- navegación principal
- servicios base
- simulación de inferencia

### Fase 2
- integración real del modelo exportado
- pruebas funcionales con cámara
- mapeo de confianza y mensajes

### Fase 3
- mejora de accesibilidad auditiva
- pruebas en Android real
- validación de desempeño con imágenes externas

### Fase 4
- ampliación del dataset
- nuevas clases
- optimización del modelo
- evaluación con usuarios

---

## 20. Comandos útiles

### Desarrollo web
```bash
ionic serve
```

### Compilación web
```bash
ionic build
```

### Sincronización con Android
```bash
npx cap sync android
```

### Abrir en Android Studio
```bash
npx cap open android
```

---

## 21. Créditos

Proyecto desarrollado como parte de una propuesta tecnológica orientada a la inclusión, accesibilidad digital y aplicación práctica de inteligencia artificial en entornos aeroportuarios.

Repositorio:

```bash
git clone https://github.com/ajahuanca/orientacion-aeroportuaria.git
```

---

## 22. Nota final

Este proyecto representa una base funcional y académica para evolucionar hacia una solución móvil de orientación accesible más robusta. La meta no es únicamente demostrar un modelo de clasificación, sino construir una herramienta tecnológica con valor social, centrada en el usuario y preparada para ampliarse de manera segura y escalable.

