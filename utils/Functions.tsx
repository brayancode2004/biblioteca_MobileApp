export const acortarTexto = (texto: string, longitud: number): string => {
    if (texto.length > longitud) {
      return texto.substring(0, longitud) + '...';
    } else {
      return texto;
    }
}