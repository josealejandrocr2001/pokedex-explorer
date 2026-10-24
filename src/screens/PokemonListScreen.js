// Pantalla de la lista: compone el encabezado, la búsqueda, la cuadrícula y los estados.
// No llama a la API: los datos vienen de los hooks usePokemonList y usePokemonSearch.

import { useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import PokemonGrid from '../components/PokemonGrid';
import PrimaryButton from '../components/PrimaryButton';
import SearchBar from '../components/SearchBar';
import { EmptyState, ErrorState, LoadingState } from '../components/StatusViews';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { colors, spacing } from '../theme';
import { getErrorMessage } from '../utils/errorMessages';

export default function PokemonListScreen({ onSelectPokemon }) {
  const list = usePokemonList();
  const search = usePokemonSearch();
  // useState para el texto del TextInput (componente controlado).
  const [searchText, setSearchText] = useState('');

  function handleSearch() {
    Keyboard.dismiss();
    search.search(searchText);
  }

  function handleShowAll() {
    setSearchText('');
    search.clear();
  }

  // Pie de la lista: muestra si se están cargando más, si falló la página o si ya no hay más.
  function renderListFooter() {
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

  function renderSearchResult() {
    switch (search.status) {
      case 'loading':
        return <LoadingState message="Buscando Pokémon..." />;
      case 'error':
        return <ErrorState message={getErrorMessage(search.error)} onRetry={search.retry} />;
      case 'empty':
        return (
          <EmptyState
            title="Sin resultados"
            message={`No hay ningún Pokémon con el nombre o número "${search.query}". Revisa cómo está escrito.`}
            actionLabel="Ver todos los Pokémon"
            onAction={handleShowAll}
          />
        );
      default:
        return (
          <PokemonGrid
            data={[search.result]}
            onSelectPokemon={onSelectPokemon}
            footer={
              <PrimaryButton
                title="Ver todos los Pokémon"
                onPress={handleShowAll}
                variant="outline"
                style={styles.showAllButton}
              />
            }
          />
        );
    }
  }

  function renderList() {
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
        footer={renderListFooter()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="PokéDex Explorer">
        <SearchBar value={searchText} onChangeText={setSearchText} onSubmit={handleSearch} />
      </AppHeader>
      {/* Mientras hay una búsqueda activa se muestra su resultado; si no, la lista.
          La lista sigue cargada en su hook, así que al volver no se pide de nuevo. */}
      <View style={styles.body}>{search.isSearching ? renderSearchResult() : renderList()}</View>
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
  showAllButton: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.xs,
  },
});
