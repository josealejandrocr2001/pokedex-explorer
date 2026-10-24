// Distintivo de un tipo (Fuego, Agua, Planta...) con su color propio.

import { StyleSheet, Text, View } from 'react-native';

import { getTypeStyle } from '../constants/pokemon';
import { radius, spacing } from '../theme';

export default function TypeBadge({ type }) {
  const typeStyle = getTypeStyle(type);

  return (
    <View style={[styles.badge, { backgroundColor: typeStyle.color }]}>
      <Text style={[styles.label, { color: typeStyle.textColor }]}>{typeStyle.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});
