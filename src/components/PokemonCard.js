import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';
import { capitalize, formatPokemonNumber } from '../utils/formatters';

function PokemonCard({ pokemon, onPress }) {
  const displayName = capitalize(pokemon.name);

  return (
    <Pressable
      onPress={() => onPress?.(pokemon.id)}
      accessibilityRole="button"
      accessibilityLabel={`Ver ficha de ${displayName}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
      <View style={styles.imageBackdrop}>
        {/* CONCEPTO: Image con URL remota — necesita width y height explícitos o no se ve. */}
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {displayName}
      </Text>
    </Pressable>
  );
}

// memo: la tarjeta solo se vuelve a dibujar si cambian sus props.
// Al cargar 20 Pokémon más, las tarjetas que ya estaban no se re-renderizan.
export default memo(PokemonCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    borderColor: colors.primary,
  },
  number: {
    alignSelf: 'flex-end',
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
  imageBackdrop: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
  },
  image: {
    width: 96,
    height: 96,
  },
  name: {
    marginTop: spacing.sm,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
});
