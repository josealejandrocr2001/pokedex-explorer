// Barra de búsqueda: campo de texto + botón "Buscar".
// Es un componente controlado: el texto vive en la pantalla y llega por props.

import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../theme';
import PrimaryButton from './PrimaryButton';

export default function SearchBar({ value, onChangeText, onSubmit }) {
  return (
    <View style={styles.container}>
      {/* TextInput controlado — value + onChangeText guardan el texto en un estado. */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Busca por nombre o número..."
        placeholderTextColor={colors.textMuted}
        // Los nombres en la API van en minúsculas: que el teclado no ponga mayúscula
        // ni "corrija" el nombre del Pokémon por otra palabra.
        autoCapitalize="none"
        autoCorrect={false}
        // La tecla "buscar" del teclado hace lo mismo que el botón.
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        accessibilityLabel="Buscar Pokémon por nombre o número"
        style={styles.input}
      />
      <PrimaryButton title="Buscar" onPress={onSubmit} variant="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    flex: 1,
    minHeight: 44,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.text,
  },
});
