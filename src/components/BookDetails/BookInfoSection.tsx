import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { acortarTexto } from '../../utils/Functions';
import { book } from '../../types';
import Colors from '../../constants/Colors';
import { esFavorito, marcarComoFavorito, quitarFavorito } from '../../services/EstudianteService';
import { useAuth } from '../../providers/AuthProvider';

function BookInfoSection({ book, prestamo, calificacion } : {book : book, prestamo : boolean, calificacion : boolean}) {
  const { session } = useAuth(); 
  const [favorite, setFavorite] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!prestamo && !calificacion){
      const checkIsFavorite = async () => {
        const response = await esFavorito(session && 'cif' in session && session.cif, book.idLibro);
        setFavorite(response);
      }
      checkIsFavorite();
    }
  },[])

  const renderAutores = () => {
    if (book.autores && book.autores.length > 0) {
      return book.autores.map(autor => autor.nombreAutor).join(', ');
    }
    return '';
  };

  const backBtn = () => {
    if(calificacion){
      router.replace({ params: { idLibro: book.idLibro }, pathname: '(bookDetails)/id' })
    }else{
      router.back()
    }
  }

  const handleFavorites = async () => {
    if (!prestamo && !calificacion) {
      try {
        setLoading(true);
        if (favorite) {
          await quitarFavorito(
            session && 'cif' in session && session.cif,
            book.idLibro
          );
          setFavorite(false);
        } else {
          await marcarComoFavorito(
            session && 'cif' in session && session.cif,
            book.idLibro
          );
          setFavorite(true);
        }
        setLoading(false);
      } catch (error: any) {
        Alert.alert('Error al quitar de favoritos:', error.message);
        setLoading(false);
      }
    }
  };


  return (
    <View style={styles.container}>

        {/* BackImage Overlay */}
        <Image style={styles.backImageOverlay} source={{ uri: book.imagen}} blurRadius={31}/>
        
         {/* <View style={styles.backImageOverlay}/> */}

        {/* Header */}
        <SafeAreaView>
            <View style={styles.header}>
            <TouchableOpacity onPress={backBtn} style={styles.backBtn}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>

            <View style={styles.headerTitle}>
                <Text style={styles.titleText}>{prestamo ? 'Confirmar Préstamo' : calificacion ? 'Añade una Calificación' : 'Book Details'}</Text>
            </View>
            
            <TouchableOpacity 
              style={[ styles.favoriteBtn, (prestamo || calificacion) && {backgroundColor: 'transparent', borderColor: 'transparent'}]}
              onPress={handleFavorites}
              disabled={loading}
              >
                <AntDesign name={favorite ? 'heart' : 'hearto'} size={24} color={prestamo || calificacion ? 'transparent' : favorite ? 'red' : 'black'}/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        <View style={styles.imagenContainer}>
            <Image source={{ uri: book.imagen}} style={styles.imagen} contentFit='fill'  />
        </View>
        <View style={styles.bookInfo}>
          <Text style={styles.title}>{acortarTexto(book.titulo, 35)}</Text>
          <Text style={styles.autor}>{acortarTexto(renderAutores(),31)}</Text>
        </View>
    </View>
  )
}

export default BookInfoSection;

const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

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
    height: windowHeight > 850 ? '76%' : windowHeight > 800 ? '80%' : '81%',
    width: windowWidth > 400 ? '46%': '41%',
    borderRadius: 15,
    elevation: 25
  },
  imagenContainer: {
    alignItems: 'center', 
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 14,
    elevation: 25,
    marginTop: windowHeight > 850 ? 0 : windowHeight > 800 ? 14  : 5,
  },
  bookInfo: {
    marginTop: windowHeight > 850 ? -55 : windowHeight > 800 ? -44  : -28,
    alignItems: 'center'
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