import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// CONCEPTO: SafeAreaView — evita que el contenido quede debajo del notch o la barra de estado.
// Se usa la versión de react-native-safe-area-context porque la de react-native está obsoleta.
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from './src/theme';

export default function App() {
  return (
    // SafeAreaProvider va UNA sola vez en la raíz: mide los márgenes seguros del dispositivo.
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.header} edges={['top']}>
        <Text style={styles.title}>PokéDex Explorer</Text>
      </SafeAreaView>
      <View style={styles.body}>
        <Text style={styles.placeholder}>Proyecto listo. Aquí irá la lista de Pokémon.</Text>
      </View>
    </SafeAreaProvider>
  );
}

// CONCEPTO: StyleSheet — los estilos van separados del JSX.
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
    paddingTop: spacing.sm,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  placeholder: {
    color: colors.textMuted,
  },
});
