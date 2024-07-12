import React, {useEffect, useState} from 'react'
import { Animated, Button, StyleSheet, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import { connect, disconnect } from '../../services/WebSocketService';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

function EstadoEntregaPrestamo() {
    const { message, codigoRetiro } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        connect(codigoRetiro, (message: string) => {
          if (message === 'entregado') {
            router.replace( { params: { message: 'Recibido'}, pathname: '(misPrestamos)/entregaSuccess'} );
          } else if (message === 'devuelto') {
            router.replace({ params: { message: 'Devuelto'}, pathname: '(misPrestamos)/entregaSuccess'} );
          }
        });
    
        return () => {
          disconnect();
        };
      }, []);

      useEffect(() => {
        if(message === 'Recibiendo'){
          setTitle('Buscando Tu Libro...')
          setDescription('En estos momentos el personal bibliotecario está buscando el libro que solicitaste para entregartelo.')
        }else if(message === 'Devolviendo'){
          setTitle('Devolviendo Libro...')
          setDescription('En estos momentos el personal bibliotecario está revisando todo para registrar tu devolución.')
        }
      },[])
    
  return (
    <View style={styles.container}>
        <LottieView
          loop={true}
          autoPlay
          style={{
            width: 500,
            height: 500,
            maxWidth: 500,
            marginBottom: -80
          }}
          source={require('../../../assets/lottie/searchingMan.json')}
        />
        <LottieView
          loop={true}
          autoPlay
          style={{
            width: 100,
            height: 100,
            maxWidth: 500,
          }}
          source={require('../../../assets/lottie/searchingIcon.json')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
    </View>
  )
}

export default EstadoEntregaPrestamo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 14
    },
    title: {
      color: Colors.light.primary,
      fontWeight: '800',
      fontSize: 24
    },
    description: {
      color: Colors.light.gray,
      paddingHorizontal: 50,
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 16
    }
})