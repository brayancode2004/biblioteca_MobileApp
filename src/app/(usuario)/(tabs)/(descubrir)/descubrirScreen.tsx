import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { obtenerTop10LibrosMasPrestados } from '../../../../services/PrestamosService';
import BooksCard from '../../../../components/Home/BooksCard';
import Colors from '../../../../constants/Colors';
import TopAutores from '../../../../components/Home/TopAutores';
import SearchHeader from '../../../../components/CommonComponents/SearchHeader';
import 'react-native-reanimated';



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
      <SearchHeader tipo='discover'/>
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