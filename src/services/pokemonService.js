// Servicio de Pokémon: TODO lo que la app necesita de la PokéAPI pasa por aquí.
// Las pantallas nunca arman URLs ni leen el JSON crudo; reciben objetos ya limpios.
//
// Decisión de arquitectura: un solo archivo de servicio porque la app consume
// una sola API con dos endpoints. Si mañana se agrega otra API (por ejemplo, favoritos
// en una base de datos), iría en su propio archivo dentro de services/.

import { ARTWORK_BASE_URL, BASE_URL, PAGE_SIZE } from '../config/api';
import { getIdFromUrl } from '../utils/formatters';
import { fetchJson } from './apiClient';

// ---------------------------------------------------------------------------
// Mapeadores
// Mapeo de campos — la respuesta real de la API es enorme; aquí tomamos
// SOLO los campos que la interfaz usa. Si la API cambia un nombre de campo,
// se corrige en este archivo y ninguna pantalla se entera.
// ---------------------------------------------------------------------------

// Un elemento de la lista solo trae { name, url }: el id sale del final de la URL.
function mapListItem(rawItem) {
  const id = getIdFromUrl(rawItem.url);

  return {
    id,
    name: rawItem.name,
    image: `${ARTWORK_BASE_URL}/${id}.png`,
  };
}

function mapPokemonDetail(raw) {
  // Algunas formas especiales no tienen arte oficial: usamos el sprite normal como respaldo.
  // ?. (optional chaining) evita que la app falle si un nivel del JSON viene vacío.
  const artwork = raw.sprites?.other?.['official-artwork']?.front_default;

  return {
    id: raw.id,
    name: raw.name,
    image: artwork ?? raw.sprites?.front_default ?? `${ARTWORK_BASE_URL}/${raw.id}.png`,
    // La API entrega la altura en decímetros y el peso en hectogramos: dividimos entre 10.
    heightInMeters: raw.height / 10,
    weightInKilograms: raw.weight / 10,
    types: raw.types.map((entry) => entry.type.name),
    stats: raw.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  };
}

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

// GET /pokemon?limit={n}&offset={m} -> una página de la lista.
// offset = cuántos Pokémon ya tenemos cargados (0, 20, 40...).
export async function getPokemonPage(offset, signal) {
  const url = `${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
  const data = await fetchJson(url, signal);

  return {
    items: data.results.map(mapListItem),
    // Si "next" viene en null, ya no hay más páginas: se detiene el scroll infinito.
    hasMore: data.next !== null,
  };
}

// GET /pokemon/{nombre o id} -> ficha completa de un Pokémon.
export async function getPokemonDetail(nameOrId, signal) {
  // encodeURIComponent — el texto que escribe el usuario se codifica antes
  // de ponerlo en la URL (espacios, tildes o símbolos romperían la ruta).
  // Un id numérico NO se codifica: un número no tiene caracteres especiales.
  const isNumericId = /^\d+$/.test(String(nameOrId));
  const path = isNumericId ? nameOrId : encodeURIComponent(nameOrId);

  const data = await fetchJson(`${BASE_URL}/pokemon/${path}`, signal);
  return mapPokemonDetail(data);
}

// Búsqueda por nombre o número. Devuelve el Pokémon con la forma de una tarjeta
// de la lista, o null si no existe.
export async function searchPokemon(term, signal) {
  try {
    const pokemon = await getPokemonDetail(term, signal);
    return { id: pokemon.id, name: pokemon.name, image: pokemon.image };
  } catch (error) {
    // Un 404 en la búsqueda NO es una falla de la app: significa "ese Pokémon no existe".
    // Lo convertimos en null para que la pantalla muestre "Sin resultados".
    // Cualquier otro error (sin internet, 500...) sí se propaga para mostrar "Reintentar".
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}
