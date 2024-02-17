import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { acortarTexto, renderStarRating } from '../../utils/Functions';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { book } from '../../types';

function BooksCard({ item, index }: { item: book; index: number }) {
  return (
    <Pressable style={styles.container} onPress={() => router.push({ params: { idLibro: item.idLibro }, pathname: '(bookDetails)/id' })}>
      <Image source={{uri: item.imagen}} style={styles.imagen} transition={650} contentFit='fill'/>
      <View style={styles.bookInfo}>
      <Text style={styles.title}>{acortarTexto(item.titulo, 14) }</Text>
      <Text style={styles.author}>{acortarTexto(item.autores[0].nombreAutor, 12) }</Text>
      <View style={styles.stars}>
        {
          renderStarRating(item.calificacionPromedio)
        }
      </View>
      </View>
    </Pressable>
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