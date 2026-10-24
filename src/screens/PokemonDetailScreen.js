// Pantalla de la ficha: imagen grande, nombre, número, tipos, medidas y estadísticas.
// Los datos vienen del hook usePokemonDetail; aquí solo se dibujan.

import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BackHandler, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import StatBar from '../components/StatBar';
import { ErrorState, LoadingState } from '../components/StatusViews';
import TypeBadge from '../components/TypeBadge';
import { getTypeStyle, STAT_LABELS } from '../constants/pokemon';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { colors, radius, spacing } from '../theme';
import { getErrorMessage } from '../utils/errorMessages';
import { capitalize, formatHeight, formatPokemonNumber, formatWeight } from '../utils/formatters';

export default function PokemonDetailScreen({ pokemonId, onBack }) {
  const { pokemon, status, error, retry } = usePokemonDetail(pokemonId);
  const insets = useSafeAreaInsets();

  // Botón "atrás" de Android: vuelve a la lista en lugar de cerrar la app.
  // useEffect con limpieza — se suscribe al abrir la ficha y se
  // desuscribe al cerrarla (return), para no dejar escuchadores "huérfanos".
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true; // true = ya manejamos el evento, Android no debe cerrar la app
    });
    return () => subscription.remove();
  }, [onBack]);

  // El color del primer tipo pinta el fondo, el círculo de la imagen y las barras.
  const typeColor = status === 'success' ? getTypeStyle(pokemon.types[0]).color : null;

  function renderContent() {
    if (status === 'loading') {
      return <LoadingState message="Cargando ficha..." />;
    }
    if (status === 'error') {
      return <ErrorState message={getErrorMessage(error)} onRetry={retry} />;
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          {/* Fondo semitransparente: al color hex se le agregan 2 dígitos de opacidad. */}
          <View style={[styles.artworkCircle, { backgroundColor: `${typeColor}40` }]}>
            {/* CONCEPTO: Image remota con width y height explícitos. */}
            <Image source={{ uri: pokemon.image }} style={styles.artwork} resizeMode="contain" />
          </View>
          <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
          <Text style={styles.name} accessibilityRole="header">
            {capitalize(pokemon.name)}
          </Text>
          <View style={styles.badges}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
        </View>

        <View style={[styles.sheet, { paddingBottom: spacing.xl + insets.bottom }]}>
          <View style={styles.measures}>
            <View style={styles.measure}>
              <Text style={styles.measureValue}>{formatHeight(pokemon.heightInMeters)}</Text>
              <Text style={styles.measureLabel}>Altura</Text>
            </View>
            <View style={styles.measureDivider} />
            <View style={styles.measure}>
              <Text style={styles.measureValue}>{formatWeight(pokemon.weightInKilograms)}</Text>
              <Text style={styles.measureLabel}>Peso</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Estadísticas base</Text>
          {pokemon.stats.map((stat) => (
            <StatBar
              key={stat.name}
              label={STAT_LABELS[stat.name] ?? stat.name}
              value={stat.value}
              color={typeColor}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, typeColor && { backgroundColor: `${typeColor}2E` }]}
    >
      {/* Fondo claro: los íconos de la barra de estado van oscuros mientras la ficha esté abierta. */}
      <StatusBar style="dark" />
      <View style={styles.topBar}>
        <PrimaryButton title="Volver a la lista" onPress={onBack} variant="light" />
      </View>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  artworkCircle: {
    width: 230,
    height: 230,
    borderRadius: 115,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artwork: {
    width: 200,
    height: 200,
  },
  number: {
    marginTop: spacing.md,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
  name: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  measures: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
  },
  measure: {
    flex: 1,
    alignItems: 'center',
  },
  measureDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  measureValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  measureLabel: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textMuted,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
});
