// Vistas de estado de la interfaz. Toda petición a la API muestra en qué estado está:
//   Cargando -> LoadingState  (indicador + texto)
//   Error    -> ErrorState    (mensaje en español + botón "Reintentar")
// El estado "Éxito" es la lista o la ficha.

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';
import PrimaryButton from './PrimaryButton';

// compact = versión pequeña para mostrar al final de la lista (scroll infinito).
export function LoadingState({ message = 'Cargando...', compact = false }) {
  return (
    <View style={compact ? styles.compact : styles.fullScreen}>
      <ActivityIndicator size={compact ? 'small' : 'large'} color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export function ErrorState({ message, onRetry, compact = false }) {
  return (
    <View style={compact ? styles.compact : styles.fullScreen}>
      {!compact && <Text style={styles.title}>Algo salió mal</Text>}
      <Text style={[styles.message, styles.errorMessage]}>{message}</Text>
      <PrimaryButton title="Reintentar" onPress={onRetry} variant={compact ? 'outline' : 'solid'} />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  compact: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  message: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 320,
  },
  errorMessage: {
    color: colors.text,
  },
});
