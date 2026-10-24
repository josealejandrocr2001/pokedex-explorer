// Hook de la lista paginada.
// Aquí vive el ESTADO de la lista (Pokémon cargados, página actual, carga, error).
// La pantalla solo lo consume y dibuja; no sabe cómo se piden los datos.

import { useCallback, useEffect, useState } from 'react';

import { getPokemonPage } from '../services/pokemonService';

// Estados posibles de la petición: 'loading' | 'error' | 'success'
export function usePokemonList() {
  // CONCEPTO: useState — cada dato que cambia la interfaz es un estado.
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  // Contador que solo sirve para volver a disparar el efecto al pulsar "Reintentar".
  const [retryCount, setRetryCount] = useState(0);

  // useEffect con array de dependencias [offset, retryCount].
  // La petición SOLO se ejecuta al montar el componente, cuando cambia la página (offset)
  // o cuando el usuario pulsa "Reintentar". Sin el array, el efecto correría en cada
  // render: pide datos -> setState -> nuevo render -> pide datos... un bucle infinito.
  useEffect(() => {
    // CONCEPTO: AbortController — su "signal" se le pasa a fetch para poder cancelarla.
    const controller = new AbortController();

    async function loadPage() {
      setStatus('loading');
      try {
        const page = await getPokemonPage(offset, controller.signal);

        // Agregamos la página nueva al final, evitando duplicados por id
        // (un id repetido haría que FlatList muestre advertencias de keys).
        setPokemons((current) => {
          const knownIds = new Set(current.map((pokemon) => pokemon.id));
          const newItems = page.items.filter((pokemon) => !knownIds.has(pokemon.id));
          return [...current, ...newItems];
        });
        setHasMore(page.hasMore);
        setStatus('success');
      } catch (err) {
        // Si la petición se canceló a propósito, no es un error que mostrar.
        if (controller.signal.aborted) {
          return;
        }
        setError(err);
        setStatus('error');
      }
    }

    loadPage();

    // Función de limpieza: si el componente se desmonta antes de que llegue
    // la respuesta, se cancela la petición y no se actualiza un estado inexistente.
    return () => controller.abort();
  }, [offset, retryCount]);

  // Se llama al llegar al final de la lista (scroll infinito).
  // El nuevo offset es "cuántos Pokémon ya tengo": si onEndReached se dispara
  // varias veces seguidas, siempre calcula el mismo valor y React no repite la petición.
  const loadMore = useCallback(() => {
    if (!hasMore || status !== 'success') {
      return;
    }
    setOffset(pokemons.length);
  }, [hasMore, status, pokemons.length]);

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  return { pokemons, status, error, hasMore, loadMore, retry };
}
