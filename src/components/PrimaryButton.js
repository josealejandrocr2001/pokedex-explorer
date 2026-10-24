// Botón reutilizable de la app ("Buscar", "Reintentar", "Volver a la lista"...).

import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from '../theme';

// variant: 'solid' (fondo rojo) | 'outline' (borde rojo) | 'light' (fondo blanco, para el encabezado rojo)
export default function PrimaryButton({ title, onPress, variant = 'solid', style }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // tamaño mínimo recomendado para tocar con el dedo
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  solid: {
    backgroundColor: colors.primary,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  light: {
    backgroundColor: colors.white,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
  solidText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
  lightText: {
    color: colors.primary,
  },
});
