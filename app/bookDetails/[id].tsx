import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { obtenerLibroPorId } from '../../services/LibrosService';
import React, {useState, useEffect} from 'react';
import { Image } from 'expo-image';
import BookInfoSection from '../../components/BookDetails/BookInfoSection';
import BookMenuSection from '../../components/BookDetails/BookMenuSection/BookMenuSection';
import BottonTabs from '../../components/BookDetails/BottonTabs';

// Autor.ts
interface Autor {
  idAutor: number;
  nombreAutor: string;
  descripcion: string;
  numLibros: number;
  autorPic: string;
  estado: boolean;
}

// Categoria.ts
interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
}

// Ubicacion.ts
interface Ubicacion {
  idUbicacion: number;
  numEstante: number;
  numRepisa: number;
}

interface Libro {
  idLibro: number;
  titulo: string;
  sinopsis: string;
  imagen: string;
  isbn: string;
  numCopiasTotales: number;
  numCopiasDisponibles: number;
  añoPublicacion: number;
  calificacionPromedio: number;
  numCalificaciones: number;
  estado: boolean;
  ubicacion: Ubicacion;
  autores: Autor[];
  categorias: Categoria[];
}

function BookDetails() {
  const [libro, setLibro] = useState<Libro | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchLibrosData = async () => {
      try {
        const response = await obtenerLibroPorId(id);
        setLibro(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchLibrosData();
  }, [id]);

  if (loading) {
    return <ActivityIndicator />;
  } else if (!libro) {
    return <Text>Error: Libro not found</Text>;
  } else {
    return (        
      <View style={styles.root}>
        {/* Book CoverSection */}
        <View style={styles.infoSectionContainer}>
          <BookInfoSection book={libro}/>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <BookMenuSection book={libro}/>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <BottonTabs/>
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
    height: 135,
  },
});