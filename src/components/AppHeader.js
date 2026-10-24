import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme';

export default function AppHeader({ title, children }) {
  return (
    // SafeAreaView con edges= top — el rojo llega hasta la barra de estado,
    // pero el texto empieza debajo del notch.
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.deviceRow}>
        <View style={styles.lensRing}>
          <View style={styles.lens}>
            <View style={styles.lensShine} />
          </View>
        </View>
        <View style={[styles.light, styles.lightRed]} />
        <View style={[styles.light, styles.lightYellow]} />
        <View style={[styles.light, styles.lightGreen]} />
      </View>

      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>

      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  lensRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  lens: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2F9BD6',
    borderWidth: 2,
    borderColor: '#1C6E9C',
  },
  lensShine: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: 6,
    marginLeft: 7,
  },
  light: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  lightRed: {
    backgroundColor: '#FF7A7A',
  },
  lightYellow: {
    backgroundColor: '#FFD43B',
  },
  lightGreen: {
    backgroundColor: '#5BD16B',
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: spacing.md,
  },
});
