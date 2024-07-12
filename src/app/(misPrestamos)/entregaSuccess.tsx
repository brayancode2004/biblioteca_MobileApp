import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import LottieView from 'lottie-react-native';

function EntregaSuccess() {
  const { message } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [secondAnimation, setSecondAnimation] = useState(false)

  useEffect(() => {
    if(message === 'Recibido'){
      setTitle('¡Libro Recibido!')
      setDescription('En estos momentos el personal bibliotecario está buscando el libro que solicitaste para entregartelo.')
    }else if(message === 'Devuelto'){
      setTitle('¡Libro Devuelto!')
      setDescription('En estos momentos el personal bibliotecario está revisando todo para registrar tu devolución.')
    }
  },[])

  return (
    <View style={styles.container}>
        {
          !setSecondAnimation && (
            <LottieView
            loop={true}
            autoPlay
            style={{
              width: 300,
              height: 300,
              maxWidth: 300,
            }}
            onAnimationFinish={() => setSecondAnimation(true)}
            source={require('../../../assets/lottie/check.json')}
          />
          )
        }

        {
          secondAnimation && (
            <LottieView
            loop={true}
            autoPlay
            style={{
              width: 300,
              height: 300,
              maxWidth: 300,
            }}
            source={require('../../../assets/lottie/reading.json')}
          />
          )
        }
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default EntregaSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.pureWhite
    },
    title: {
      color: Colors.light.primary,
      fontWeight: '800',
      fontSize: 24
    },
    description: {
      color: Colors.light.pureWhite,
      paddingHorizontal: 50,
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 16
    }
})