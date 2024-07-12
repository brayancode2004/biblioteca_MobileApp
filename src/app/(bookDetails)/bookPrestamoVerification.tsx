import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import BookInfoSection from '../../components/BookDetails/BookInfoSection';
import { obtenerLibroPorId } from '../../services/LibrosService';
import { book } from '../../types';
import BottonTabs from '../../components/BookDetails/BottonTabs';
import PrestamoDetails from '../../components/BookDetails/BookPrestamoScreen/prestamoDetails';
import { comprobarElegibilidad } from '../../services/PrestamosService';
import { useAuth } from '../../providers/AuthProvider';
import { Image } from 'expo-image';
import 'react-native-reanimated';


function BookPrestamoVerification() {
  const { session } = useAuth();
  const { idLibro } = useLocalSearchParams();
  const [libro, setLibro] = useState<book | null>(null);
  const [elegibilidad, setElegibiblidad] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchLibrosData = async () => {
    try {
      if (session && 'cif' in session) {
        const resultadoElegibilidad = await comprobarElegibilidad(session.cif, idLibro);
        setElegibiblidad(resultadoElegibilidad.mensaje);
        setFechaDevolucion(resultadoElegibilidad.fechaDevolucion)
      }
      const response = await obtenerLibroPorId(idLibro);
      setLibro(response);
      setLoading(false);
    } catch (e : any) {
      const mensajeError = e.response && e.response.data && typeof e.response.data === 'object' 
      ? e.response.data.message 
      : e.response.data;
      setError(mensajeError)
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLibrosData();
  }, [idLibro]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles.root}>
        {libro && elegibilidad === "Préstamo Pre-Aprobado" ? (
          <>
            {/* Book CoverSection */}
            <View style={styles.infoSectionContainer}>
              <BookInfoSection book={libro} prestamo={true} calificacion={false} delivery={false}/>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
              <PrestamoDetails book={libro} fechaDevolucion={fechaDevolucion} />
            </View>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              <BottonTabs idLibro={libro.idLibro} prestamo={true} />
            </View>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 14}}>
            <Text style={styles.errorTitle}>Oups!</Text>
            <Image source={require('../../../assets/error.svg')} style={styles.errorImagen}/>
            <Text style={styles.errorSubtitle}>Tu solicitud ha sido negada</Text>
            <Text style={styles.errorReason}>{error}</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
              <Text style={styles.btnBackTitle}>Volver</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default BookPrestamoVerification;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.pureWhite
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
  errorTitle: {
    color: Colors.light.primary,
    fontFamily: 'InterSemi',
    fontSize: 36
  },
  errorSubtitle: {
    color: Colors.light.secondary,
    fontFamily: 'InterSemi',
    fontSize: 22
  },
  errorImagen: {
    width: 200,
    height: 200
  },
  errorReason: {
    color: Colors.light.gray,
    fontSize: 18
  },
  btnBack: {
    backgroundColor: Colors.light.primary,
    width: '80%',
    height: '5%',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17
  },
  btnBackTitle: {
    color: Colors.light.white,
    fontFamily: 'InterBold',
    fontSize: 16
  }
});
