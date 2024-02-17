import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import { formatearFecha } from '../../utils/Functions';
import { Image } from 'expo-image';


function RenovarPrestamo({}) {
  const { error, fechaDevolucion } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {
        !error ? (
          <>
            <Text style={styles.title}>¡Préstamo Renovado!</Text>
            <LottieView
                loop={false}
                autoPlay
                style={{
                width: '40%',
                maxWidth: 400,
            }}
            source={require('../../../assets/lottie/renovar.json')}
            />
            <View style={styles.detallesContainer}>
                <Text style={styles.detalles}> Tu nueva fecha de Devolución es: </Text>
                <Text style={styles.fechaDevolucion}>{fechaDevolucion && formatearFecha(fechaDevolucion.toString())}</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
              <Ionicons name='library' size={26} color={Colors.light.pureWhite}/>
              <Text style={styles.btnBackTitle}>Mis Préstamos</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.errorTitle}>Oups!</Text>
            <Image source={require('../../../assets/error.svg')} style={styles.errorImagen}/>
            <Text style={styles.errorSubtitle}>Renovación Negada</Text>
            <View style={styles.detallesContainer}>
              <Text style={styles.errorReason}>{error}</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
              <Text style={styles.btnBackTitle}>Volver</Text>
            </TouchableOpacity>
          </>
        )
      }
    </View>
  )
}
export default RenovarPrestamo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 17,
  },    
  title: {
    color: Colors.light.secondary,
    fontFamily: 'InterBold',
    fontSize: 22
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
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  detallesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detalles: {
      color: Colors.light.gray, 
      fontWeight: '800',
      fontSize: 16,
      textAlign: 'center'
  },
  fechaDevolucion: {
    color: Colors.light.secondary, 
    fontFamily: 'InterBold',
    fontSize: 16,
    textAlign: 'center'
  },
  btnBack: {
    backgroundColor: Colors.light.primary,
    flexDirection: 'row',
    width: '80%',
    height: '5%',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
    gap: 11
  },
  btnBackTitle: {
    color: Colors.light.white,
    fontFamily: 'InterBold',
    fontSize: 16
  }
})