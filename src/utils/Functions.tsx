import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const acortarTexto = (texto: string, longitud: number): string => {
    if (texto.length > longitud) {
      return texto.substring(0, longitud) + '...';
    } else {
      return texto;
    }
}

export const renderStarRating = (rating: number) => {
  const starArray = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const size = 18;
  // Agrega estrellas completas
  for (let i = 0; i < fullStars; i++) {
    starArray.push(<FontAwesome name='star' key={i} color="#FCBA02" size={size}  />);
  }

  // Agrega media estrella si corresponde
  if (hasHalfStar) {
    starArray.push(<FontAwesome name='star-half-empty' key="half" size={size} color="#FCBA02" />);
  }

  // Agrega estrellas vacías hasta llegar a 5
  while (starArray.length < 5) {
    starArray.push(<FontAwesome name='star-o' key={starArray.length}size={size} color="#EAB72B" />);
  }

  return starArray;
};

export const esCorreoValido = (email: string) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

// Guardar un usuario en Async Storage
export const guardarUsuario = async (valor: string) => {
  try {
    await AsyncStorage.setItem('@user', valor);
    console.log('Objeto guardado correctamente');
  } catch (error) {
    console.error('Error al guardar el objeto:', error);
  }
};

// Obtener un usuario de Async Storage
export const obtenerUsuario = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue
  } catch (error) {
    console.error('Error al obtener el objeto:', error);
    return null;
  }
};

// Función para eliminar los datos del usuario al cerrar sesión
export const eliminarDatosUsuario = async () => {
  try {
    await AsyncStorage.removeItem('@user');
    console.log('Datos de usuario eliminados correctamente al cerrar sesión');
  } catch (error) {
    console.error('Error al eliminar los datos del usuario:', error);
  }
};

export function cortarStringEnPrimerEspacio(texto: string | undefined) {
  const indiceEspacio = texto?.indexOf(' '); // Encuentra el índice del primer espacio
  if (indiceEspacio !== -1) { // Si se encuentra un espacio
    return texto?.substring(0, indiceEspacio); // Devuelve la parte del string antes del primer espacio
  } else {
    return texto; // Si no se encuentra ningún espacio, devuelve el string original
  }
}

export function formatearFecha(fecha : string ) {
    const partes = fecha.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export function getColorPorEstado(estado : string) {
  switch (estado) {
    case 'multado':
      return '#d33';
    case 'en ejecución':
      return '#0B545B';
    case 'finalizado':
      return '#C1C1C1';
    case 'aprobado':
      return 'green';
    default:
      return 'inherit'; // o cualquier color por defecto
  }
}
