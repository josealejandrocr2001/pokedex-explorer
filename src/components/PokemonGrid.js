import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { spacing } from '../theme';
import PokemonCard from './PokemonCard';

export default function PokemonGrid({ data, onSelectPokemon, onEndReached, footer }) {
  // useCallback: la función que dibuja cada tarjeta no se recrea en cada render, así FlatList y memo(PokemonCard) pueden evitar trabajo innecesario.
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.cell}>
        <PokemonCard pokemon={item} onPress={onSelectPokemon} />
      </View>
    ),
    [onSelectPokemon],
  );

  return (
    // FlatList en lugar de ScrollView + map.
    // FlatList solo dibuja las tarjetas que se ven en pantalla;
    // con ScrollView + map se dibujarían TODAS y la app se pondría lenta.
    <FlatList
      data={data}
      renderItem={renderItem}
      // keyExtractor — clave única por elemento para que React sepa qué tarjeta es cuál.
      keyExtractor={(item) => String(item.id)}
      // numColumns — cuadrícula de 2 columnas.
      numColumns={2}
      // onEndReached — scroll infinito. Se dispara cuando faltan 0.5 pantallas para llegar al final.
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={footer}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.sm,
    paddingBottom: spacing.xl,
  },
  // Cada celda ocupa la mitad del ancho
  cell: {
    width: '50%',
    padding: spacing.xs + 2,
  },
});
