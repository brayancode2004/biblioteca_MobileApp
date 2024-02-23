import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { obtenerTop10LibrosMasPrestados } from '../../../../services/PrestamosService';
import BooksCard from '../../../../components/Home/BooksCard';
import Colors from '../../../../constants/Colors';
import { router } from 'expo-router';
import TopAutores from '../../../../components/Home/TopAutores';


function DescubrirScreen() {
  const [topLibros, setTopLibros] = useState([]);

  // Dentro de tu componente o función asíncrona
const obtenerTop10Libros = async () => {
  try {
      const top10Libros = await obtenerTop10LibrosMasPrestados();
      setTopLibros(top10Libros);
  } catch (error) {
      console.error("Error al obtener los top 10 libros más prestados:", error);
  }
};

// Llama a la función cuando sea necesario, por ejemplo, en useEffect para cargar los datos cuando el componente se monta
useEffect(() => {
  obtenerTop10Libros();
}, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title1}>Te Podría</Text>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'flex-end'}}>
            <Text style={styles.title2}>Interesar</Text>
            <FontAwesome name="arrow-down" size={20} color={Colors.light.primary} />
          </View>
        </View>
          {/* Boton de busqueda */}
        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/searchScreen')}>
          <FontAwesome name="search" size={22} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.topLibrosContainer}>
        <FlatList
          ListHeaderComponent={
          <View style={{gap: 22}}> 
            <TopAutores discover={true} />
            <Text style={styles.topLibrosTitle}>Top 10 Más Prestados</Text>
          </View>  }
          data={topLibros}
          renderItem={({item}) => <BooksCard item={item} top={true}/>}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 22}}
        />
      </View>
    </SafeAreaView>
  )
}

export default DescubrirScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 14,
      gap: 22,
      backgroundColor: Colors.light.pureWhite,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 11,
      paddingHorizontal: 11
    },
    title1: {
      fontSize: 22,
      color: Colors.light.gray,
      fontWeight: '700'
    },
    title2: {
      fontSize: 22,
      color: Colors.light.primary,
      fontFamily: 'InterBold',
    },
    iconContainer: {
      width: 50,
      height: 50,
      backgroundColor: Colors.light.clearGray,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    topLibrosContainer: {
      gap: 14,
      marginBottom: 140
    },
    topLibrosTitle: {
      fontSize: 22,
      fontFamily: 'InterSemi',
      marginLeft: 11
    }
})