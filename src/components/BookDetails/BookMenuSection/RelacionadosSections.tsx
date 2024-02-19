import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { obtenerLibrosPorCategorias } from '../../../services/LibrosService';
import { renderStarRating } from '../../../utils/Functions';
import { router } from 'expo-router';
import { book } from '../../../types';

function RelacionadosSections({ book } : { book: book }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrosData = async () => {
        const response = await obtenerLibrosPorCategorias(book.categorias[0].nombreCategoria, book.categorias[1].nombreCategoria)
        setBooks(response.data);
        setLoading(false);
}
    fetchLibrosData();
  },[])

  if(loading){
    return(
      <ActivityIndicator/>
    )
  }else{
    return (
      <View style={styles.container}>
        <Text style={styles.title}>También te podrían gustar:</Text>
        {
          books.map((book: book, index: number) => (
            <Pressable key={book.idLibro} style={styles.bookItemContainer} onPress={() => router.push({ params: { idLibro: book.idLibro }, pathname: '(bookDetails)/id' })}>
              <Image source={{ uri: book.imagen}} style={styles.bookImagen}/>
              <View style={styles.bookInfoSection}>
                <Text style={styles.bookTitle}>{book.titulo}</Text>
                <Text style={styles.bookAutors}>{book.autores[0].nombreAutor}</Text>
                <View style={styles.stars}>
                  {
                    renderStarRating(book.calificacionPromedio)
                  }
                </View>
              </View>
            </Pressable>
          ))
        }
      </View>
    )
  }
}

export default RelacionadosSections;

const styles = StyleSheet.create({
  container: {
    gap: 11
  },
  title: {
    fontWeight: '700',
    fontSize: 18
  },
  bookItemContainer: {
    flexDirection: 'row',
    paddingVertical: 11,
    gap: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E4E7',
  },
  bookImagen: {
    width: 120,
    height: 170,
    borderRadius: 11
  },
  bookInfoSection: {
    justifyContent: 'center',
    gap: 11,
    flexWrap: 'wrap',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    maxWidth: '80%',
    overflow: 'hidden',
  },
  bookAutors: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '600'
  },
  stars: {
    flexDirection: 'row',
    gap: 2
  }
})