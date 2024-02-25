import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { obtenerLibroPorId } from '../../services/LibrosService';
import React, {useState, useEffect} from 'react';
import BookInfoSection from '../../components/BookDetails/BookInfoSection';
import BookMenuSection from '../../components/BookDetails/BookMenuSection/BookMenuSection';
import BottonTabs from '../../components/BookDetails/BottonTabs';
import { book } from '../../types';


function BookDetails() {
  const [libro, setLibro] = useState<book | null>(null);
  const [loading, setLoading] = useState(true);
  const { idLibro } = useLocalSearchParams();

  useEffect(() => {
    const fetchLibrosData = async () => {
      try {
        const response = await obtenerLibroPorId(idLibro);
        setLibro(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchLibrosData();
  }, [idLibro]);

  if (loading) {
    return <ActivityIndicator />;
  } else if (!libro) {
    return <Text>Error: Libro not found</Text>;
  } else {
    return (        
      <View style={styles.root}>
        {/* Book CoverSection */}
        <View style={styles.infoSectionContainer}>
          <BookInfoSection book={libro} prestamo={false}/>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <BookMenuSection book={libro}/>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <BottonTabs idLibro={libro.idLibro} prestamo={false}/>
        </View>
      </View>
    );
  }
};

export default BookDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  infoSectionContainer: {
    flex: 2.4,
  },
  descriptionContainer: {
    flex: 2,
    marginTop: 5,
  },
  buttonsContainer: {
    height: 100,
  },
});