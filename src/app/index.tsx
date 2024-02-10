import React from 'react';
import { StyleSheet, View, Text, Pressable,} from 'react-native'; // Import ScrollView
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';
import { router } from 'expo-router';

function Index() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/welcome2.jpg')} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text>
              <Text style={styles.highlight}>Lee y Disfruta:</Text>
              <Text style={styles.title}> Tu Amado Paraíso Literario</Text>
            </Text>
          </View>
          <Text style={styles.text}>
            Contamos con libros de todas las categorías dentro de los apartados de Literatura y Académico
          </Text>
        </View>
        <Pressable style={styles.button} 
        onPress={() => router.push('(auth)/sign-up')}
        >
          <Text style={styles.buttonText}>{`¡Comienza Ahora!`}</Text>
        </Pressable>
        <View style={styles.signTextContainer}>
          <Text style={styles.signQuestion}>¿Ya tienes una cuenta?</Text>
          <Text style={styles.signLink} onPress={() => router.push('(auth)/sign-in')}> Inicia Sesión</Text>
        </View>
      <StatusBar style="light" />
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 28,
  },
  image: {
    width: '100%',
    aspectRatio: 0.8
  },
  textContainer: {
    paddingHorizontal: 26,
    alignItems: 'center',
    gap: 28
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 28
  },
  highlight: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 27,
    maxWidth: '80%',
    textAlign: 'center',
  },
  title: {
    color: Colors.light.secondary,
    fontWeight: '600',
    fontSize: 27,
    maxWidth: '80%',
    textAlign: 'center',
  },
  text:{
    color: Colors.light.gray,
    textAlign: 'center',
    fontSize: 16
  },
  button: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    width: '86%',

  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  signTextContainer: {
    flexDirection: 'row'
  },
  signQuestion: {
    color: Colors.light.secondary,
    fontSize: 16,
    fontWeight: '500'
  },
  signLink: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: '600',
  }
});
