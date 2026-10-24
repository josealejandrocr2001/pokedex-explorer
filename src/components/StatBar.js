// Una estadística base: nombre, valor y barra de ancho proporcional.

import { StyleSheet, Text, View } from 'react-native';

import { MAX_STAT_VALUE } from '../constants/pokemon';
import { colors, radius, spacing } from '../theme';

export default function StatBar({ label, value, color }) {
  // El ancho es un porcentaje del máximo posible (255). Ej: 90 -> 35 %.
  // Math.min evita que una barra se salga si algún valor superara el máximo.
  const percentage = Math.min(value / MAX_STAT_VALUE, 1) * 100;

  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    width: 100,
    fontSize: 14,
    color: colors.textMuted,
  },
  value: {
    width: 40,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
    marginRight: spacing.md,
    fontVariant: ['tabular-nums'],
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
