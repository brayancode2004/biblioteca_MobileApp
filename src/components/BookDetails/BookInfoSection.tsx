import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { acortarTexto } from '../../utils/Functions';
import { book } from '../../types';

function BookInfoSection({ book } : {book : book}) {
 const navigation = useNavigation()

 const renderAutores = () => {
  if (book.autores && book.autores.length > 0) {
    return book.autores.map(autor => autor.nombreAutor).join(', ');
  }
  return '';
};


  return (
    <View style={styles.container}>

        {/* BackImage Overlay */}
        <Image style={styles.backImageOverlay} source={{ uri: book.imagen}} blurRadius={31}/>
        
         {/* <View style={styles.backImageOverlay}/> */}

        {/* Header */}
        <SafeAreaView>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>

            <View style={styles.headerTitle}>
                <Text style={styles.titleText}>Book Details</Text>
            </View>

            <TouchableOpacity style={styles.favoriteBtn}>
                <AntDesign name='hearto' size={24}/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        <View style={styles.imagenContainer}>
            <Image source={{ uri: book.imagen}} style={styles.imagen} contentFit='fill'  />
            <View style={{ marginTop: 22, alignItems: 'center'}}>
              <Text style={styles.title}>{acortarTexto(book.titulo, 35)}</Text>
              <Text style={styles.autor}>{acortarTexto(renderAutores(),31)}</Text>
            </View>
        </View>
    </View>
  )
}

export default BookInfoSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: '35%',
    left: 0,
    backgroundColor: '#F6F6F6',
    opacity: 0.9,
  },
  imagen: {
    height: '70%',
    width: '42.4%',
    borderRadius: 15,
  },
  imagenContainer: {
    alignItems: 'center', 
    elevation: 5, 
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: -1, height: 11 },
    shadowOpacity: 0.26,
    shadowRadius: 14,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 8,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 19
  },
  favoriteBtn:{
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 8,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  autor: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 16
  }
})