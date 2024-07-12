import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import { obtenerAutoresPaginados } from '../../services/AutorService';
import { autor } from '../../types';
import { AntDesign, Entypo } from '@expo/vector-icons'
import Colors from '../../constants/Colors';
import 'react-native-reanimated';


function AuthorsMultipleSelector({ autoresId, onUpdateAutoresId }) {
    const [loading, setLoading] = useState(false);
    const [autores, setAutores] = useState<autor[]>([]);
    const [selected, setSelected] = useState<any>([]);
    const [listEnded, setListEnded] = useState(false);
    const [nextPage, setNextPage] = useState(0);
    const pageSize = 10; 
    
    const RenderEmpty = () => {
        return(
            <View style={{ padding: 16, alignItems: 'center'}}>
                <Text>¡Ups no hay autores que mostrar!</Text>
            </View>
        )
    }

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

  return (
    <View style={styles.container}>
        <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            placeholder='Seleccione a los autores'
            data={autores}
            labelField="nombreAutor"
            valueField="idAutor"
            value={autoresId}
            onChange={onUpdateAutoresId}
            flatListProps={{
                ListEmptyComponent: <RenderEmpty/>,
                onEndReached: fetchAutores,
                onEndReachedThreshold:1,
                ListFooterComponent: () => (loading && <ActivityIndicator size="small" color={Colors.light.primary} />)
            }}
            renderLeftIcon={() => (
                <Entypo
                style={styles.icon}
                color="black"
                name="add-user"
                size={20}
                />
            )}
            selectedStyle={styles.selectedStyle}
        />
  </View>
  )
}

export default AuthorsMultipleSelector

const styles = StyleSheet.create({
    container: { 
        padding: 16 
    },
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
})