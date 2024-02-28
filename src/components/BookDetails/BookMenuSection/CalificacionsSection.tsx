import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image';
import { book, calificacion } from '../../../types';
import { obtenerCalificacionesPorLibro, verificarCalificacion } from '../../../services/CalificacionService';
import { renderStarRating } from '../../../utils/Functions';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { router } from 'expo-router';
import { useAuth } from '../../../providers/AuthProvider';

function CalificacionsSection({ book } : { book: book }) {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false);
  const [checkingCalificado, setCheckingCalificado] = useState(false);
  const [calificaciones, setCalificaciones] = useState<calificacion[]>([]);
  const [yaCalificado, setYaCalificado] = useState();
  const [nextPage, setNextPage] = useState(0);
  const [listEnded, setListEnded] = useState(false);
  const pageSize = 10; // Tamaño de página

  const checkCalificado = async () => {
    try{
      setCheckingCalificado(true);
      if(session && 'cif' in session){
        const response2 = await verificarCalificacion(session.cif,book.idLibro)
        setYaCalificado(response2)
        setCheckingCalificado(false);
      }
    }catch(e : any){
      const mensajeError = e.response && e.response.data && typeof e.response.data === 'object' 
      ? e.response.data.message 
      : e.response.data;
      Alert.alert(mensajeError);
      setCheckingCalificado(false);
    }
  }

  const fetchCalificaciones = async () => {
    if(loading){
      return
    }
    if(!listEnded){
      try{
        setLoading(true);
        const response = await obtenerCalificacionesPorLibro(book.idLibro, nextPage, pageSize);
        if(response.content.length > 0) {
          setCalificaciones((prevCalificaciones) => {
              return [...prevCalificaciones, ...response.content]
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
  };

  useEffect(() => {
    checkCalificado();
    fetchCalificaciones();
  }, []);

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeftContainer}>
            <Text style={styles.calificacionesTitle}>Calificaciones:</Text>
            <Text style={styles.calificacionesNumber}>({book.numCalificaciones})</Text>
          </View>
          {
            checkingCalificado ? (
              <ActivityIndicator/>
            ): (
            <TouchableOpacity style={styles.calificarBtn} 
              onPress={() => router.replace({ params: { idLibro: book.idLibro }, pathname: '(bookDetails)/bookCalificarScreen' })}
              disabled={yaCalificado}
            >
              <AntDesign name="edit" size={24} color={yaCalificado ? Colors.light.gray : Colors.light.primary} />
              <Text style={[styles.calificarBtnTitle, yaCalificado && {color: Colors.light.gray}]}>{yaCalificado ? 'Calificado' : 'Calificar'}</Text>
            </TouchableOpacity>
            )
          }
        </View>
            {
              !loading && calificaciones.length < 1 && (
                <View style={{marginTop: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                  fontWeight: '500', 
                  fontSize: 22, 
                  textAlign: 'center',
                  color: Colors.light.gray
                }}
                >
                  Tú puedes ser el primero en dar tu opinión🤯
                </Text>
              </View>
              )
            }
            <FlatList
              data={calificaciones}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CalificacionItem calificacion={item} />}
              onEndReached={fetchCalificaciones}
              // onEndReachedThreshold={0.1} 
              style={{ marginBottom: 217}}
              ListFooterComponent={() => (loading && <ActivityIndicator size="small" color={Colors.light.primary} /> )}
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
    marginTop: 11,
    gap: 22
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
  },
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  headerLeftContainer: { 
    flexDirection: 'row', 
    gap: 2
  },
  calificacionesTitle: { 
    fontWeight: '600', 
    fontSize: 17
  },
  calificacionesNumber: { 
    color: Colors.light.primary, 
    fontWeight: '600', 
    fontSize: 17
  },
  calificarBtn: { 
    flexDirection: 'row', 
    gap: 4, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  calificarBtnTitle: {
    color: Colors.light.primary, 
    fontWeight: '700', 
    fontSize: 16
  }
})


