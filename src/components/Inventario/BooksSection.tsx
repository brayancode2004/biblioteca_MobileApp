import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { book } from '../../types';
import { obtenerLibrosPaginados } from '../../services/LibrosService';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import BookHorizontalItem from '../CommonComponents/BookHorizontalItem';
import { router } from 'expo-router';

function BooksSection() {
  const [loading, setLoading] = useState(false);
  const [libros, setLibros] = useState<book[]>([]);
  const [listEnded, setListEnded] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const pageSize = 10; // Tamaño de página

  const fetchLibros = async () => {
    if(loading){
      return
    }
    if(!listEnded){
      try{
        setLoading(true);
        const response = await obtenerLibrosPaginados(nextPage, pageSize);
        setLibros((prevLibros) => {
              return [...prevLibros, ...response.content]
        });
        setNextPage(nextPage + 1);
        Alert.alert(response.last)
        response.last && setListEnded(true)
        setLoading(false);
      }catch(e : any){
        Alert.alert('Error al obtener el inventario de los libros', e.message)
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const flatListHeader = () => {
    return(
        <View>
            <TouchableOpacity style={styles.addBtn} 
              onPress={() => router.push({ params: { tipo: 'crear' }, pathname: '(inventario)/book' })}
            >
                <MaterialIcons name="library-add" size={24} color={Colors.light.pureWhite} />
                <Text style={styles.addBtnTitle}>Añadir Libro</Text>
            </TouchableOpacity>
        </View>
    )
  }

  return (
    <View style={styles.container}>
        <FlatList
          ListHeaderComponent={flatListHeader}
          data={libros}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <BookHorizontalItem book={item}/>}
          onEndReached={fetchLibros}
          onEndReachedThreshold={4} 
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          ListFooterComponent={() => (loading && <ActivityIndicator size="small" color={Colors.light.primary} /> )}
        />
    </View>
  )
}

export default BooksSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40
    },
    flatList: { 
        flex: 1,
        paddingHorizontal: 19,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    flatListContent: {
        gap: 14,
        paddingTop: 22,
    },
    addBtn: {
        backgroundColor: Colors.light.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 11,
        borderRadius: 11,
        gap: 8
    },
    addBtnTitle: {
        color: Colors.light.pureWhite,
        fontWeight: '700',
        fontSize: 17
    }
})