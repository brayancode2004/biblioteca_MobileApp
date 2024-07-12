import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { autor } from '../../types';
import 'react-native-reanimated';


function AuthorHorizontalItem({ author } : { author: autor}) {
  return (
    <Pressable style={styles.container} 
    // onPress={() => router.push({ params: { idLibro: book.idLibro }, pathname: '(bookDetails)/id' })}
>
    <Image source={{ uri: author.autorPic}} style={styles.authorPic}/>
    <View style={styles.authorInfoSection}>
        <Text style={styles.authorName}>{author.nombreAutor}</Text>
        <Text style={styles.authorNumBooks}>{author.numLibros} {author.numLibros > 1 ? 'Libros' : 'Libro'} aquí</Text>
    </View>
</Pressable>
  )
}

export default AuthorHorizontalItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 11,
        gap: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E4E7',
      },
      authorPic: {
        width: 110,
        height: 110,
        borderRadius: 55
      },
      authorInfoSection: {
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap',
      },
      authorName: {
        fontSize: 20,
        fontWeight: '600',
      },
      authorNumBooks: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '600'
      },
})