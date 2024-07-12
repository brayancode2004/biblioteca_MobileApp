import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { book } from '../../../types';
import 'react-native-reanimated';


function AcercaSection({ book } : { book: book }) {

  return (
    <View style={styles.container}>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sinopsis: </Text>
            <Text style={styles.sinopsis}>{book.sinopsis}</Text>
        </View>
        <View style={[styles.section, {gap: 4}]}>
            <Text style={styles.sectionTitle}>Año de publicación: </Text>
            <Text style={[styles.sinopsis, {fontSize: 17}]}>{book.añoPublicacion}</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{book.autores.length > 1 ? 'Autores: ' : 'Autor: '}</Text>
            {
                book.autores.map((autor, index) => (
                    <View key={autor.idAutor} style={styles.autorContainer}>
                        <Image source={{ uri: autor.autorPic}} style={styles.autorPic}/>
                        <View>
                            <Text style={styles.autorName}>{autor.nombreAutor}</Text>
                            <Text style={styles.autorBookNumber}>{autor.numLibros} {autor.numLibros > 1 ? 'libros' : 'libro'} aquí</Text>
                        </View>
                    </View>
                ))
            }
        </View>
        <View style={styles.categoriasContainer}>
            <Text style={styles.categorias}>#{book.categorias[0].nombreCategoria}</Text>
            <Text style={styles.categorias}>#{book.categorias[1].nombreCategoria}</Text>
        </View>
    </View>
  )
}

export default AcercaSection;

const styles = StyleSheet.create({
    container: {
        gap: 22
    },
    section: {
        gap: 11
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600'
    },
    sinopsis: {
        fontSize: 15,
        fontWeight: '500',
        color: 'gray'
    },
    autorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11
    },
    autorPic: {
        width: 75,
        height: 75,
        borderRadius: 37.5
    },
    autorName: {
        fontSize: 17,
        fontWeight: '600'

    },
    autorBookNumber: {
        fontWeight: '600',
        color: 'gray'
    },
    categoriasContainer: {
        flexDirection: 'row',
        gap: 11
    },
    categorias: {
        color: '#F9410B',
        fontSize: 16,
        fontWeight: '700'
    }
})