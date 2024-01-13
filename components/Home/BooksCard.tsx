import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { acortarTexto, renderStarRating } from '../../utils/Functions';
// Autor.ts
interface Autor {
  idAutor: number;
  nombreAutor: string;
  descripcion: string;
  numLibros: number;
  autorPic: string;
  estado: boolean;
}

// Categoria.ts
interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
}

// Ubicacion.ts
interface Ubicacion {
  idUbicacion: number;
  numEstante: number;
  numRepisa: number;
}

interface Libro {
  idLibro: number;
  titulo: string;
  sinopsis: string;
  imagen: string;
  isbn: string;
  numCopiasTotales: number;
  numCopiasDisponibles: number;
  añoPublicacion: number;
  calificacionPromedio: number;
  numCalificaciones: number;
  estado: boolean;
  ubicacion: Ubicacion;
  autores: Autor[];
  categorias: Categoria[];
}

function BooksCard({ item, index }: { item: Libro; index: number }) {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.imagen}} style={styles.imagen}/>
      <View style={styles.bookInfo}>
      <Text style={styles.title}>{acortarTexto(item.titulo, 14) }</Text>
      <Text style={styles.author}>{acortarTexto(item.autores[0].nombreAutor, 12) }</Text>
      <View style={styles.stars}>
        {
          renderStarRating(item.calificacionPromedio)
        }
      </View>
      </View>
    </View>
  )
}

export default BooksCard;

const styles = StyleSheet.create({
  container: {
    gap: 2
  },
  imagen: {
    width: 120,
    height: 170,
    borderRadius: 11
  },
  bookInfo: {
    alignItems: 'center',
    gap: 2
  },
  title: {
    fontWeight: 'bold'
  },
  author: {
    color: 'gray',
    fontWeight: '600'
  },
  stars: {
    flexDirection: 'row',
    gap: 2
  }
})