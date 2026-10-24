// Traduce un error técnico a un mensaje claro en español para el usuario.
// El usuario no debe ver "TypeError: Network request failed" ni "Error HTTP: 500".

export function getErrorMessage(error) {
  const status = error?.status;

  // 5xx: el problema está en el servidor de la API, no en nuestra app.
  if (status >= 500) {
    return 'El servidor de la PokéAPI no está respondiendo. Intenta de nuevo en unos minutos.';
  }

  // 4xx: la petición no se pudo atender (por ejemplo, demasiadas peticiones).
  if (status >= 400) {
    return `No pudimos completar la consulta (error ${status}). Intenta de nuevo.`;
  }

  // Sin status: fetch ni siquiera recibió respuesta (sin internet, red bloqueada, etc.).
  return 'No pudimos conectarnos. Revisa tu conexión a internet e intenta de nuevo.';
}
