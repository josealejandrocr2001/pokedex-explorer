import { StatusBar } from 'expo-status-bar';
// CONCEPTO: SafeAreaProvider va UNA sola vez en la raíz: mide los márgenes seguros
// del dispositivo (notch, barra de estado) para que los SafeAreaView los respeten.
// Se usa react-native-safe-area-context porque el SafeAreaView de react-native está obsoleto.
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PokemonListScreen from './src/screens/PokemonListScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <PokemonListScreen />
    </SafeAreaProvider>
  );
}
