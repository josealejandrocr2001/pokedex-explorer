// Funciones puras de formato: reciben un dato y devuelven otro, sin llamar a la API
// ni tocar el estado. Por eso son fáciles de probar y de reutilizar.

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
// filter(Boolean) quita el texto vacío que deja el "/" final.
export function getIdFromUrl(url) {
  const segments = url.split('/').filter(Boolean);
  return Number(segments[segments.length - 1]);
}

// 25 -> "#025" (número con 3 dígitos, como pide el taller).
export function formatPokemonNumber(id) {
  return `#${String(id).padStart(3, '0')}`;
}

// "pikachu" -> "Pikachu"
export function capitalize(text) {
  if (!text) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// 0.4 -> "0.4 m"
export function formatHeight(meters) {
  return `${meters.toFixed(1)} m`;
}

// 6 -> "6.0 kg"
export function formatWeight(kilograms) {
  return `${kilograms.toFixed(1)} kg`;
}

// Limpia lo que escribe el usuario antes de buscar:
// "  Pikachu " -> "pikachu" | "#025" -> "25" | "Mr Mime" -> "mr-mime"
export function normalizeSearchTerm(text) {
  const clean = text.trim().toLowerCase().replace(/^#/, '').replace(/\s+/g, '-');

  // La API no reconoce ceros a la izquierda: "025" debe enviarse como "25".
  if (/^\d+$/.test(clean)) {
    return String(Number(clean));
  }
  return clean;
}
