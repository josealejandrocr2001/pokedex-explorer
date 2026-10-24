// Hook de la búsqueda por nombre o número.
// Estados posibles: 'idle' (sin búsqueda) | 'loading' | 'success' | 'empty' | 'error'

import { useCallback, useEffect, useState } from 'react';

import { searchPokemon } from '../services/pokemonService';
import { normalizeSearchTerm } from '../utils/formatters';

export function usePokemonSearch() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // useEffect con dependencias [query, retryCount].
  // La búsqueda NO se dispara con cada letra que se escribe: solo cuando el usuario
  // pulsa "Buscar" (cambia query) o "Reintentar" (cambia retryCount).
  useEffect(() => {
    // Sin texto no hay búsqueda: la pantalla vuelve a mostrar la lista completa.
    if (query === '') {
      return;
    }

    // Signal — si el usuario busca otra cosa antes de que llegue la respuesta,
    // la limpieza del efecto cancela la petición anterior. Así nunca se muestra
    // el resultado de una búsqueda vieja encima de la nueva.
    const controller = new AbortController();

    async function runSearch() {
      try {
        const found = await searchPokemon(query, controller.signal);
        setResult(found);
        // null significa que la API respondió 404: no existe -> "Sin resultados".
        setStatus(found ? 'success' : 'empty');
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(err);
        setStatus('error');
      }
    }

    runSearch();
    return () => controller.abort();
  }, [query, retryCount]);

  const retry = useCallback(() => {
    setStatus('loading');
    setRetryCount((count) => count + 1);
  }, []);

  // Se llama al pulsar "Buscar". Acepta nombre o número, ignorando
  // mayúsculas y espacios al inicio o al final.
  const search = useCallback(
    (text) => {
      const term = normalizeSearchTerm(text);

      // Misma búsqueda que la actual: no repetimos la petición (salvo que haya fallado).
      if (term === query) {
        if (status === 'error') {
          retry();
        }
        return;
      }

      // El estado 'loading' se pone aquí, junto con el query, para que la pantalla
      // nunca muestre un "Sin resultados" falso mientras arranca la petición.
      setStatus(term === '' ? 'idle' : 'loading');
      setQuery(term);
    },
    [query, status, retry],
  );

  const clear = useCallback(() => {
    setQuery('');
    setStatus('idle');
  }, []);

  return { query, status, result, error, isSearching: query !== '', search, clear, retry };
}
