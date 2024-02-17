import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { formatearFecha } from '../../utils/Functions';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';


function BookPrestamoSuccess() {
const navigation = useNavigation();
const {error, libroTitulo, fechaDevolucion} = useLocalSearchParams()

  if(error){
    <View style={styles.container}>
        <Text>Ha habido un error</Text>
        <Text>{error}</Text>
    </View>
  }else {
      return (
        <View style={styles.container}>
            <LottieView
                loop={false}
                autoPlay
                style={{
                width: '44%',
                maxWidth: 400,
            }}
            source={require('../../../assets/lottie/check.json')}
            />
            <Text style={styles.title}>¡Préstamo Listo!</Text>
            <View style={styles.detallesContainer}>
                <Text style={styles.detalles}> Has prestado el libro {libroTitulo}</Text>
                <Text style={styles.detalles}>Recuerda devolverlo antes del {fechaDevolucion && formatearFecha(fechaDevolucion.toString())}</Text>
            </View>
            <TouchableOpacity onPress={() => router.replace(('(usuario)/prestamosScreen'))} style={styles.btnBack}>
                <Ionicons name='library' size={26} color={Colors.light.pureWhite}/>
                <Text style={styles.btnBackTitle}>Mis Préstamos</Text>
            </TouchableOpacity>
        </View>
      )
  }
}

export default BookPrestamoSuccess;

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
    detallesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    detalles: {
        color: Colors.light.gray,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center'
    },
    btnBack: {
        backgroundColor: Colors.light.primary,
        flexDirection: 'row',
        gap: 11,
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
})