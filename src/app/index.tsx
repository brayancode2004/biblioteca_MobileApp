import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions,} from 'react-native'; // Import ScrollView
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';
import { useRootNavigationState, router, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Index() {
  const { session } = useAuth();
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  

  if(session && session.role == 'user'){
    return <Redirect href={'(usuario)/homeScreen'}/>
  }

  if(session && session.role == 'biblioteca'){
    return <Redirect href={'(bibliotecario)/homeScreen'}/>
  }

  // const borrar = async () => {
  //   await AsyncStorage.removeItem('@firstLaunch');

  // }


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
          <Text style={styles.buttonText}>¡Comienza Ahora!</Text>
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

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: windowHeight > 850 ? 28 : windowHeight > 800 ? 14  : 8,
  },
  image: {
    width: '100%',
    height: '62%'
  },
  textContainer: {
    paddingHorizontal: 26,
    alignItems: 'center',
    gap: windowHeight > 850 ? 28 : 8,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: windowHeight > 850 ? 28 : 4,
    textAlign: 'center'
  },
  highlight: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: windowHeight > 800 ? 27 : 23,
    maxWidth: '80%',
    textAlign: 'center',
  },
  title: {
    color: Colors.light.secondary,
    fontWeight: '600',
    fontSize: windowHeight > 800 ? 27 : 23,
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
    fontWeight: '700',
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
