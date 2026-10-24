// Cliente HTTP genérico.
// Es el ÚNICO lugar de la app donde se llama a fetch. Así la regla
// "revisar response.ok antes de leer el JSON" se escribe una sola vez
// y ningún componente tiene que preocuparse por ella.

// función asincrónica — async/await espera la respuesta sin congelar la interfaz.
// signal (AbortController) — permite cancelar la petición si el usuario
// sale de la pantalla o hace otra búsqueda antes de que llegue la respuesta.
// Así no saturamos la API con peticiones que ya nadie va a usar.
export async function fetchJson(url, signal) {
  // request -> response. fetch envía la petición (request)
  // y con await esperamos la respuesta (response) del servidor.
  const response = await fetch(url, { signal });

  // Revisar response.ok ANTES de response.json().
  // response.ok es true solo con códigos 2xx (200 = todo bien).
  // Si el Pokémon no existe, la PokéAPI responde 404 con TEXTO plano ("Not Found"),
  // no con JSON: llamar response.json() ahí rompería la app con un error de parseo.
  // Recordatorio: 4xx = error del cliente (pedimos algo que no existe o mal formado),
  //               5xx = error del servidor (la API se cayó).
  if (!response.ok) {
    // throw new Error — lanzamos una excepción con el código HTTP.
    // Guardamos el status para que las capas de arriba distingan un 404 de un 500.
    const error = new Error(`Error HTTP: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  // La API responde en formato JSON; lo convertimos en objeto JavaScript.
  return response.json();
}
