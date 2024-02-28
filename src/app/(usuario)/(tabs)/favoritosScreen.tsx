import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, FlatList, ActivityIndicator } from 'react-native';
import { favorito, book } from '../../../types';
import { useAuth } from '../../../providers/AuthProvider';
import Colors from '../../../constants/Colors';
import { obtenerFavoritos } from '../../../services/EstudianteService';
import FavoritosItem from '../../../components/Favoritos/favoritosItem';

function FavoritosScreen() {
  const { session } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [favoritos, setFavoritos] = useState<favorito[]>([]);
  const [nextPage, setNextPage] = useState(0);
  const [listEnded, setListEnded] = useState(false);
  const pageSize = 10;

  const fetchFavoritos = async () => {
    if(loading){
      return
    }
    if(!listEnded){
      try{
        setLoading(true);
        const response = await obtenerFavoritos(session && 'cif' in session && session.cif, nextPage, pageSize);
        if(response.content.length > 0) {
          setFavoritos((prevFavoritos) => {
              return [...prevFavoritos, ...response.content]
          });
          setNextPage(nextPage + 1);
          setLoading(false);
        }else{
          setListEnded(true)
          setLoading(false)
        }
      }catch(e : any){
        const mensajeError = e.response && e.response.data && typeof e.response.data === 'object' 
        ? e.response.data.message 
        : e.response.data;
        Alert.alert(mensajeError)
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchFavoritos();
  },[])

  const flatListHeader = () => {
    return(
      !loading && favoritos.length < 1 && (
        <View style={{marginTop: 226, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{
            fontWeight: '500', 
            fontSize: 28, 
            textAlign: 'center',
            color: Colors.light.gray
          }}
            >
              Aún no has añadido libros a Favoritos🤡
            </Text>
          </View>
        )
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Libros Favoritos</Text>


        <FlatList
          ListHeaderComponent={flatListHeader}
          data={favoritos}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FavoritosItem favorito={item} />}
          onEndReached={fetchFavoritos}
              // onEndReachedThreshold={0.1} 
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          ListFooterComponent={() => (loading && <ActivityIndicator size="small" color={Colors.light.primary} /> )}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    marginBottom: 69,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.light.pureWhite,
    marginLeft: 17,
    marginVertical: 22
  },
  flatList: { 
    flex: 1,
    paddingHorizontal: 19,
    backgroundColor: Colors.light.pureWhite,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  flatListContent: {
    gap: 14,
    paddingTop: 22,
  }
})

export default FavoritosScreen
