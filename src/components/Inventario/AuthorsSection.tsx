import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { autor } from '../../types';
import { obtenerAutoresPaginados } from '../../services/AutorService';
import Colors from '../../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import AuthorHorizontalItem from './AuthorHorizontalItem';
import 'react-native-reanimated';


function AuthorsSection() {
    const [loading, setLoading] = useState(false);
    const [autores, setAutores] = useState<autor[]>([]);
    const [listEnded, setListEnded] = useState(false);
    const [nextPage, setNextPage] = useState(0);
    const pageSize = 10; // Tamaño de página
  
    const fetchAutores = async () => {
      if(loading){
        return
      }
      if(!listEnded){
        try{
          setLoading(true);
          const response = await obtenerAutoresPaginados(nextPage, pageSize);
          if(response.content.length > 0) {
            setAutores((prevAutores) => {
                return [...prevAutores, ...response.content]
            });
            setNextPage(nextPage + 1);
            setLoading(false);
          }else{
            setListEnded(true)
            setLoading(false)
          }
        }catch(e : any){
          Alert.alert('Error al obtener los autores',e.message)
          setLoading(false);
        }
      }
    };
  
    useEffect(() => {
      fetchAutores();
    }, []);

    const flatListHeader = () => {
        return(
            <View>
                <TouchableOpacity style={styles.addBtn}>
                    <Entypo name="add-user" size={24} color={Colors.light.pureWhite} />
                    <Text style={styles.addBtnTitle}>Añadir Autor</Text>
                </TouchableOpacity>
            </View>
        )
    }

  return (
    <View style={styles.container}>
        <FlatList
          data={autores}
          ListHeaderComponent={flatListHeader}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <AuthorHorizontalItem author={item}/>}
          onEndReached={fetchAutores}
          onEndReachedThreshold={4} 
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          ListFooterComponent={() => (loading && <ActivityIndicator size="small" color={Colors.light.primary} /> )}
        />
    </View>
  )
}

export default AuthorsSection;

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