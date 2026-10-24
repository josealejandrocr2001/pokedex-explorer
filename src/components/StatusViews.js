// Vistas de estado de la interfaz.
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

// Un estado vacío no es un error: la petición funcionó, pero no hay nada que mostrar.
// Por eso ofrece un siguiente paso (actionLabel) en lugar de "Reintentar".
export function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <View style={styles.fullScreen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && <PrimaryButton title={actionLabel} onPress={onAction} variant="outline" />}
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
