// Datos fijos del dominio Pokémon: paleta de tipos y nombres en español.
// La API responde en inglés ("fire", "special-attack"); aquí se traduce para la interfaz.

const LIGHT_TEXT = '#FFFFFF';
const DARK_TEXT = '#1F2937';

// Paleta propia del equipo: un color por tipo. En los colores claros el texto
// va oscuro para que se pueda leer (contraste).
export const TYPE_STYLES = {
  normal: { label: 'Normal', color: '#75786F', textColor: LIGHT_TEXT },
  fire: { label: 'Fuego', color: '#C9481C', textColor: LIGHT_TEXT },
  water: { label: 'Agua', color: '#2F6FC8', textColor: LIGHT_TEXT },
  grass: { label: 'Planta', color: '#2F8530', textColor: LIGHT_TEXT },
  electric: { label: 'Eléctrico', color: '#F2C318', textColor: DARK_TEXT },
  ice: { label: 'Hielo', color: '#5CCFE0', textColor: DARK_TEXT },
  fighting: { label: 'Lucha', color: '#C53B33', textColor: LIGHT_TEXT },
  poison: { label: 'Veneno', color: '#9450C0', textColor: LIGHT_TEXT },
  ground: { label: 'Tierra', color: '#D6A055', textColor: DARK_TEXT },
  flying: { label: 'Volador', color: '#8AA9EC', textColor: DARK_TEXT },
  psychic: { label: 'Psíquico', color: '#D23A6B', textColor: LIGHT_TEXT },
  bug: { label: 'Bicho', color: '#A2B427', textColor: DARK_TEXT },
  rock: { label: 'Roca', color: '#B8A66A', textColor: DARK_TEXT },
  ghost: { label: 'Fantasma', color: '#6A4A90', textColor: LIGHT_TEXT },
  dragon: { label: 'Dragón', color: '#5463D6', textColor: LIGHT_TEXT },
  dark: { label: 'Siniestro', color: '#5A4A45', textColor: LIGHT_TEXT },
  steel: { label: 'Acero', color: '#4D7A8E', textColor: LIGHT_TEXT },
  fairy: { label: 'Hada', color: '#E58BD9', textColor: DARK_TEXT },
};

// Si la API devuelve un tipo que no está en la paleta, no falla: usa un gris.
export function getTypeStyle(type) {
  return TYPE_STYLES[type] ?? { label: type, color: '#8A8F98', textColor: LIGHT_TEXT };
}

export const STAT_LABELS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque esp.',
  'special-defense': 'Defensa esp.',
  speed: 'Velocidad',
};

// Valor máximo posible de una estadística base: la barra se dibuja en proporción a 255.
export const MAX_STAT_VALUE = 255;
