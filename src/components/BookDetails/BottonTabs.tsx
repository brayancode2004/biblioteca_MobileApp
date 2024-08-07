import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Foundation } from '@expo/vector-icons';
import { router } from 'expo-router';
import { verificarPrestamo , solicitarPrestamo} from '../../services/PrestamosService';
import { book } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../providers/AuthProvider';
import Colors from '../../constants/Colors';
import 'react-native-reanimated';


function BottonTabs({ idLibro, prestamo } : {idLibro : number, prestamo : boolean }) {
  const { session } = useAuth()
  const [yaPrestado, setYaPrestado] = useState();
  const [loading, setLoading] = useState(false);

  const verificandoPrestamo = async () => {
    if(session && 'cif' in session){
      const responseYaPrestado = await verificarPrestamo(session.cif, idLibro);
      setYaPrestado(responseYaPrestado);
    }
  }

  useEffect(() => {
    if(!prestamo){
      verificandoPrestamo();
    }
  },[])



  const handlePrestar = async () => {
    if(prestamo && session && 'cif' in session){
      setLoading(true)
      try{
        const prestamoResult = await solicitarPrestamo(session.cif, idLibro);
        setLoading(false)
        router.replace({ 
          params: { libroTitulo: prestamoResult.libro.titulo, fechaDevolucion: prestamoResult.fechaDevolucion}, 
          pathname: '(bookDetails)/bookPrestamoSuccess' 
        });
      }catch(e: any){
        const mensajeError = e.response && e.response.data && typeof e.response.data === 'object' 
        ? e.response.data.message 
        : e.response.data;
        setLoading(false)
        router.push({ params: { error: mensajeError }, pathname: '(bookDetails)/bookPrestamoSuccess' });
      }

    }else{
      router.push({ params: { idLibro: idLibro }, pathname: '(bookDetails)/bookPrestamoVerification' });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      {/* <View style={{ flex: 1}}> */}

        <View style={[styles.container, prestamo && {paddingHorizontal: 11}]}>
          {
            prestamo ? (
              <>
                <TouchableOpacity style={styles.prestarBtn} onPress={handlePrestar} disabled={loading}>
                  <Text style={styles.prestarText}>{ loading ? 'Confirmando Préstamo...' : 'Confirmar Préstamo' }</Text>
                  <Foundation name='book-bookmark' size={24} color='white'/>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {
                  !yaPrestado && (
                    <View style={styles.dateContainer}>
                      <Text style={styles.dateTitle}>Devolución:</Text>
                      <Text style={styles.date}>17 JULIO 2024</Text>
                    </View>
                  )
                }

                <TouchableOpacity 
                  style={[styles.prestarBtn, yaPrestado && {backgroundColor: Colors.light.gray}]} 
                  onPress={handlePrestar}
                  disabled={yaPrestado ? true : false}
                  >
                  <Text style={styles.prestarText}>{yaPrestado ? 'Prestado' : 'Prestar'}</Text>
                  <Foundation name='book-bookmark' size={24} color='white'/>
                </TouchableOpacity>
              </>
            )
          }
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
}

export default BottonTabs;

const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      flex: 1,
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      height:  windowHeight > 850 ? 100 : 80,
      width: '100%',
      justifyContent: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderWidth: 1,
      borderColor: '#E5E5E5',
      paddingBottom: windowHeight > 850 ? 20 : 10,
      paddingTop: windowHeight > 850 ? 10 : 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.10,
      shadowRadius: 8,  
      elevation: 5,
      backgroundColor: '#fff'
      },
  dateContainer: {
      flex: 0.8,
      justifyContent: 'center',
      marginLeft: 22,
  },
  dateTitle: {
      color: 'gray',
      fontWeight: '600'
  },
  date: {
      color: '#F9410B',
      fontWeight: '600',
      fontSize: 16
      ,
  },
  prestarBtn: {
      flex: 1,
      flexDirection: 'row',
      gap: 11,
      backgroundColor: '#F9410B',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      marginVertical: 10,
      borderRadius: 28,
      elevation: 8, // Sombras en Android
      shadowColor: '#000', // Sombras en iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
  },
  prestarText: {
      fontSize: 18,
      lineHeight: 22,
      color: 'white',
      fontWeight: '600'
  }
})