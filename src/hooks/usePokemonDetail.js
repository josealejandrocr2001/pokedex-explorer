// Hook de la ficha de un Pokémon.
// Estados posibles: 'loading' | 'error' | 'success'

import { useCallback, useEffect, useState } from 'react';

import { getPokemonDetail } from '../services/pokemonService';

export function usePokemonDetail(pokemonId) {
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // useEffect con dependencias [pokemonId, retryCount].
  // Se pide la ficha al abrirla y solo se vuelve a pedir si cambia el Pokémon
  // o si el usuario pulsa "Reintentar".
  useEffect(() => {
    const controller = new AbortController();

    async function loadDetail() {
      setStatus('loading');
      try {
        const data = await getPokemonDetail(pokemonId, controller.signal);
        setPokemon(data);
        setStatus('success');
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(err);
        setStatus('error');
      }
    }

    loadDetail();

    // Si el usuario vuelve a la lista antes de que llegue la ficha, se cancela la petición.
    return () => controller.abort();
  }, [pokemonId, retryCount]);

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  return { pokemon, status, error, retry };
}
