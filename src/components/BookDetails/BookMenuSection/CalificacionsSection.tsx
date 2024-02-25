import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { book, calificacion } from '../../../types';
import { obtenerCalificacionesPorLibro } from '../../../services/CalificacionService';
import { renderStarRating } from '../../../utils/Functions';
import Colors from '../../../constants/Colors';

function CalificacionsSection({ book } : { book: book }) {
  const [loading, setLoading] = useState(true);
  const [calificaciones, setCalificaciones] = useState<calificacion[]>([]);
  const [page, setPage] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false); // Nueva bandera para indicar si se ha alcanzado el final de la lista
  const pageSize = 10; // Tamaño de página

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        setLoading(true);
        const response = await obtenerCalificacionesPorLibro(book.idLibro, page, pageSize);
        if (response.content.length === 0) {
          setReachedEnd(true); // Se ha alcanzado el final de la lista
        } else {
          setCalificaciones(prevCalificaciones => [...prevCalificaciones, ...response.content]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las calificaciones del libro:', error);
        // Manejar el error según sea necesario
        setLoading(false);
      }
    };

    fetchCalificaciones();
  }, [book.idLibro, page]);

  const loadMoreCalificaciones = async () => {
    if (!loading && !reachedEnd) { // Solo cargar más si no estás cargando y no has alcanzado el final de la lista
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Calificaciones:</Text> */}
      <FlatList
        data={calificaciones}
        keyExtractor={(item) => item.idCalificacion.toString()}
        renderItem={({ item }) => <CalificacionItem calificacion={item} key={item.idCalificacion}/>}
        onEndReached={loadMoreCalificaciones}
        onEndReachedThreshold={0.1} // Ajusta este valor según sea necesario
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#000" /> : null}
      />
    </View>
  );
}

function CalificacionItem ({ calificacion } : { calificacion: calificacion}) {
  return (
    <View style={styles.calificacionItem}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 14}}>
        <Image source={{ uri: calificacion.userPic}} style={styles.userpic}/>
        <Text style={styles.userName}>{calificacion.nombreCompleto}</Text>
      </View>
      <Text style={styles.comentario}>{calificacion.comentario}</Text>
      <View style={{ flexDirection: 'row', gap: 11}}>
        <View style={{ flexDirection: 'row', gap: 4}}>
          {renderStarRating(calificacion.puntuacion)}
        </View>
        <Text style={styles.puntuacion}>{calificacion.puntuacion}</Text>
      </View>
    </View>
  );
}


export default CalificacionsSection;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 14,
    gap: 11
  },
  calificacionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingBottom: 10,
    gap: 8,
    paddingHorizontal: 6
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
  },
  userpic: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  userName: {
    fontSize: 16,
    fontWeight: '500'
  },
  comentario: {
    color: Colors.light.gray,
    fontSize: 15
  }, 
  puntuacion: {
    color: Colors.light.gray,
    fontSize: 16,
    fontWeight: '600'
  }
})