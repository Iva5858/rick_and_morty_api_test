# rick_and_morty_api_test

# Explorador del Universo de Rick y Morty

## Descripción
El Explorador del Universo de Rick y Morty es una aplicación web interactiva que permite a los fans explorar el vasto universo de la popular serie animada "Rick y Morty". Los usuarios pueden buscar y ver detalles sobre personajes, lugares y episodios de la serie. Este proyecto utiliza Node.js para el backend y JavaScript vanilla para el frontend.

## Características
- Funcionalidad de búsqueda para personajes, lugares y episodios
- Visualización detallada de información para cada entidad
- Capacidades de búsqueda difusa para consultas más flexibles
- Diseño responsivo para varios tamaños de pantalla
- Interfaz visualmente atractiva basada en el tema de la serie

## Stack Tecnológico
- Backend: Node.js con Express.js
- Frontend: HTML5, CSS3, JavaScript Vanilla (ES6+)
- Interacción con API: Axios para realizar peticiones HTTP
- Búsqueda Difusa: Fuse.js
- API Externa: API de Rick y Morty

## Prerrequisitos
- Node.js (v12.0.0 o superior)
- npm (generalmente viene con Node.js)

## Instalación y Desarrollo Local
Para ejecutar este proyecto localmente:

1. Clona el repositorio:
   ```
   git clone https://github.com/Iva5858/rick_and_morty_api_test.git
   ```
2. Navega al directorio del proyecto:
   ```
   cd rick_and_morty_api_test
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Inicia el servidor:
   ```
   node server.js
   ```
5. Abre tu navegador y visita `http://localhost:3000`

## Uso
1. Selecciona el tipo de búsqueda que deseas realizar (Personaje, Lugar o Episodio) del menú desplegable.
2. Ingresa tu término de búsqueda en el campo de entrada.
3. Haz clic en el botón "Buscar" o presiona Enter para iniciar la búsqueda.
4. Navega por los resultados mostrados en la página.
5. Haz clic en cualquier tarjeta de resultado para ver información más detallada en una ventana modal.

## Cómo Funciona

### Backend (Node.js con Express)
- El servidor Node.js actúa como intermediario entre el frontend y la API de Rick y Morty.
- Maneja las solicitudes a la API, procesa los datos y envía respuestas al cliente.
- Se utiliza Express.js para configurar rutas y manejar solicitudes HTTP.

### Frontend
- El frontend está construido con JavaScript vanilla, HTML y CSS.
- Envía solicitudes al backend de Node.js, que a su vez interactúa con la API de Rick y Morty.
- Se utiliza Fuse.js en el lado del cliente para las capacidades de búsqueda difusa.

### Flujo de Datos
1. El usuario ingresa un término de búsqueda en el frontend.
2. El frontend envía una solicitud al backend de Node.js.
3. El backend realiza una solicitud a la API de Rick y Morty.
4. La respuesta de la API es procesada por el backend y enviada de vuelta al frontend.
5. El frontend muestra los resultados y maneja cualquier interacción adicional del usuario.

### Proceso de Búsqueda
1. El backend recibe la consulta de búsqueda del frontend.
2. Consulta la API de Rick y Morty para obtener datos relevantes.
3. Los resultados son procesados, potencialmente usando Fuse.js para coincidencias difusas si no se encuentran coincidencias exactas.
4. Los resultados filtrados y procesados se envían de vuelta al frontend para su visualización.

### Mecanismo de Visualización
- Los resultados de búsqueda se muestran como tarjetas en un diseño de cuadrícula responsivo.
- Cada tarjeta muestra información clave sobre el personaje, lugar o episodio.
- Al hacer clic en una tarjeta, se abre una ventana modal con información más detallada.

## API
Este proyecto utiliza la [API de Rick y Morty](https://rickandmortyapi.com/) para obtener datos sobre el universo de la serie.

## Agradecimientos
- A la [API de Rick y Morty](https://rickandmortyapi.com/) por proporcionar los datos

