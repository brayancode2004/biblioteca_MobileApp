import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { acortarTexto, renderStarRating } from '../../utils/Functions';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { book } from '../../types';
import 'react-native-reanimated';


function BooksCard({ item, top }: { item: book, top: boolean }) {
  return (
  
    <Pressable style={[styles.container, top && {marginHorizontal: 11 }]} onPress={() => router.push({ params: { idLibro: item.idLibro }, pathname: '(bookDetails)/id' })}>
      <Image source={{uri: item.imagen}} style={top ? styles.imagenTop : styles.imagen} transition={650} contentFit='fill'/>
      <View style={styles.bookInfo}>
      <Text style={styles.title}>{acortarTexto(item.titulo, 14) }</Text>
      <Text style={styles.author}>{acortarTexto(item.autores[0].nombreAutor, 12) }</Text>
      <View style={styles.stars}>
        {
          renderStarRating(item.calificacionPromedio, 18)
        }
      </View>
      </View>
    </Pressable>
  )
}

export default BooksCard;

const styles = StyleSheet.create({
  container: {
    gap: 2,
    flex: 1
  },
  imagen: {
    width: 120,
    height: 170,
    borderRadius: 11
  },
  imagenTop: {
    width: '100%',
    aspectRatio: 1/1.4,
    borderRadius: 14
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