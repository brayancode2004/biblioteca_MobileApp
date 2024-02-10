import FontAwesome from '@expo/vector-icons/FontAwesome';

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