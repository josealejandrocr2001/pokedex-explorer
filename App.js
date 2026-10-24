import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// SafeAreaProvider va UNA sola vez en la raíz: mide los márgenes seguros
// del dispositivo (notch, barra de estado) para que los SafeAreaView los respeten.
// Se usa react-native-safe-area-context porque el SafeAreaView de react-native está obsoleto.
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PokemonDetailScreen from './src/screens/PokemonDetailScreen';
import PokemonListScreen from './src/screens/PokemonListScreen';

// Una sola pantalla principal con dos vistas (lista y ficha), sin librería de navegación:
// el taller usa la plantilla blank, así que basta con un estado que diga qué vista mostrar.
export default function App() {
  // CONCEPTO: useState — id del Pokémon abierto. null = se está viendo la lista.
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const isDetailOpen = selectedPokemonId !== null;

  // useCallback: la función no cambia entre renders, así el useEffect de la ficha
  // (que la usa para el botón atrás de Android) no se vuelve a ejecutar sin necesidad.
  const closeDetail = useCallback(() => setSelectedPokemonId(null), []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />

      {/* Decisión: la lista NO se desmonta al abrir la ficha, solo se oculta.
          Así conserva los Pokémon ya cargados, la búsqueda y la posición del scroll,
          y al volver no se repiten las peticiones a la API. */}
      <View style={[styles.screen, isDetailOpen && styles.hidden]}>
        <PokemonListScreen onSelectPokemon={setSelectedPokemonId} />
      </View>

      {isDetailOpen && <PokemonDetailScreen pokemonId={selectedPokemonId} onBack={closeDetail} />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});
