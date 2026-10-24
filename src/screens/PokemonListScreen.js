// Pantalla de la lista: compone el encabezado, la cuadrícula y los estados.
// No llama a la API: todo el manejo de datos viene del hook usePokemonList.

import { StyleSheet, Text, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import PokemonGrid from '../components/PokemonGrid';
import { ErrorState, LoadingState } from '../components/StatusViews';
import { usePokemonList } from '../hooks/usePokemonList';
import { colors, spacing } from '../theme';
import { getErrorMessage } from '../utils/errorMessages';

export default function PokemonListScreen({ onSelectPokemon }) {
  const list = usePokemonList();

  // Pie de la lista: muestra si se están cargando más, si falló la página o si ya no hay más.
  function renderFooter() {
    if (list.status === 'loading') {
      return <LoadingState message="Cargando más Pokémon..." compact />;
    }
    if (list.status === 'error') {
      return <ErrorState message={getErrorMessage(list.error)} onRetry={list.retry} compact />;
    }
    if (!list.hasMore) {
      return <Text style={styles.endText}>Llegaste al final de la PokéDex.</Text>;
    }
    return null;
  }

  function renderContent() {
    // Primera carga: todavía no hay nada que mostrar, el estado ocupa toda la pantalla.
    if (list.pokemons.length === 0) {
      if (list.status === 'error') {
        return <ErrorState message={getErrorMessage(list.error)} onRetry={list.retry} />;
      }
      return <LoadingState message="Cargando Pokémon..." />;
    }

    // Éxito: la cuadrícula con scroll infinito.
    return (
      <PokemonGrid
        data={list.pokemons}
        onSelectPokemon={onSelectPokemon}
        onEndReached={list.loadMore}
        footer={renderFooter()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="PokéDex Explorer" />
      <View style={styles.body}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
  },
  endText: {
    textAlign: 'center',
    color: colors.textMuted,
    paddingVertical: spacing.xl,
  },
});
