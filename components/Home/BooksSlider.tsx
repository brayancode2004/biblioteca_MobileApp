import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { obtenerLibrosPorCategorias } from '../../services/LibrosService';
import BooksCard from './BooksCard';

function BooksSlider({category1, category2}: {category1: string, category2: string}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrosData = async () => {
            const response = await obtenerLibrosPorCategorias(category1, category2)
            setBooks(response.data);
            setLoading(false);
    }
    fetchLibrosData();
    },[category1]);

 if(loading){
    return(
        <ActivityIndicator/>
    )
 }else{
     return (
       <View style={styles.container}>
        <Text style={styles.title}>{category2}</Text>
        <FlatList
          data={books}
          renderItem={({ item, index }) => <BooksCard item={item} index={index} />}
          // keyExtractor={(item) => item.idLibro.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
       </View>
     )
 }
}

export default BooksSlider;

const styles = StyleSheet.create({
  container: {
    gap: 11,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 20,
    // color: '#FD3510',
    color: 'gray'
  },
  flatList: {
    gap: 22
},
})