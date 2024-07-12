import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { book } from '../../types';
import { renderStarRating } from '../../utils/Functions';
import { router } from 'expo-router';
import 'react-native-reanimated';


function BookHorizontalItem({ book } : { book: book }) {
  return (
    <Pressable style={styles.container} 
        onPress={() => router.push({ params: { idLibro: book.idLibro, tipo: 'actualizar/eliminar' }, pathname: '(inventario)/book' })}
    >
        <Image source={{ uri: book.imagen}} style={styles.bookImagen}/>
        <View style={styles.bookInfoSection}>
        <Text style={styles.bookTitle}>{book.titulo}</Text>
        <Text style={styles.bookAutors}>{book.autores[0].nombreAutor}</Text>
        <View style={styles.stars}>
            {
            renderStarRating(book.calificacionPromedio, 18)
            }
        </View>
        </View>
  </Pressable>
  )
}

export default BookHorizontalItem;

const styles = StyleSheet.create({
    container: {
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