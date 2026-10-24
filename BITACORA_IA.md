# Bitácora de uso de IA

Registro de cómo se usó inteligencia artificial durante el taller PokéDex Explorer.

- **Herramienta:** Claude (Anthropic)
- **Estudiante:** Jose Alejandro Colorado Ruiz
- **Insumos entregados a la IA:** el enunciado del taller (PDF)

## Registro por parte

| Parte | Qué se pidió |
|---|---|
| 1. Setup | Recomendación para crear el proyecto con la plantilla y proponer una estructura de carpetas |
| 2. Capa de API | Como puedo separar la lógica de red de la interfaz siguiendo lo visto en clase (`BASE_URL`, `response.ok`, `throw new Error`, `signal`, `encodeURIComponent`) |
| 3. Lista | Apoyo para el `FlatList` de 2 columnas, scroll infinito y estados de carga/error |
| 4. Búsqueda y ficha | Búsqueda por nombre/número, "Sin resultados" y ficha con tipos y estadísticas | 

## Decisiones que se tomaron a partir de la propuesta

- Usar **hooks personalizados** para el estado de cada petición, además de `services/` para la red. Así las pantallas solo dibujan.
- Mantener **un solo archivo de servicio**, porque es una sola API con dos endpoints.
- Tratar el **404 de la búsqueda como "Sin resultados"** y no como un error.
- **No desmontar la lista** al abrir la ficha, para no repetir peticiones al volver.

#
