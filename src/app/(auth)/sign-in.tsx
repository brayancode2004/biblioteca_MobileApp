import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, router } from 'expo-router';
import Colors from '../../constants/Colors';
import { loginEstudiante } from '../../services/EstudianteService';
import { loginPersonalBibliotecario } from '../../services/PersonalBibliotecarioService';
import { esCorreoValido, guardarUsuario } from '../../utils/Functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../providers/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import 'react-native-reanimated';


function SignInScreen() {
  const { setSession, session} = useAuth()
  const navigation = useNavigation();
  const [cif, setCif] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    setLoading(true)
    if(!esCorreoValido(cif)){
      // MODO USUARIOS
      try{
        const credencialesAEnviar = { cif: cif, password: password } 
        const usuario = await loginEstudiante(credencialesAEnviar);
        guardarUsuario(usuario.data.cif)
        setSession(usuario.data)
        // Revisando si la app ya ha sido iniciada para mostrar o no la onboardinScreen
        const firstLaunch = await AsyncStorage.getItem('@firstLaunch')
        setLoading(false)
        if(firstLaunch === null){
          router.replace('(auth)/onboardingScreen')
        }else {
          router.replace('(usuario)/homeScreen')
        }
      }catch(e: any){
        setLoading(false)
        Alert.alert(e.response.data)
      }
    }else{
      // MODO PERSONAL BIBLIOTECARIO
        try{
          const credencialesAEnviar2 = { correoInstitucional: cif, password: password };
          const usuario = await loginPersonalBibliotecario(credencialesAEnviar2);
          guardarUsuario(usuario.data.correoInstitucional)
          setSession(usuario.data)
          const firstLaunch = await AsyncStorage.getItem('@firstLaunch')
          setLoading(false)
          if(firstLaunch === null){
            router.replace('(auth)/onboardingScreen')
          }else {
            router.replace('(bibliotecario)/homeScreen')
          }
        }catch(e: any){
          // Esto es lo que pasa si la contraseña es incorrecta
        setLoading(false)
        Alert.alert(e.response.data)

        }
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name='arrow-back-outline' size={24} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/reading.png')} style={styles.image}/>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Cif</Text>
            <TextInput
              placeholder='22010480'
              value={cif}
              onChangeText={setCif}
              style={styles.formTextInput}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Contraseña</Text>
            <TextInput
              secureTextEntry
              placeholder='Ingresa tu contraseña'
              value={password}
              onChangeText={setPassword}
              style={styles.formTextInput}
            />
          </View>
          <TouchableOpacity disabled={loading} style={styles.button} onPress={onSignIn}>
            <Text style={styles.buttonText}> {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}  </Text>
          </TouchableOpacity>
          <View style={styles.signTextContainer}>
            <Text style={styles.signQuestion}>¿Aún no tienes una cuenta?</Text>
            <Text style={styles.signLink} onPress={() => router.push('(auth)/sign-up')}> Regístrate</Text>
          </View>
        </View>
    </KeyboardAwareScrollView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primary,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  backBtn: {
    padding: 6,
    backgroundColor: 'white',
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 11,
      },
    }),
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 260
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.light.pureWhite,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 32,
    paddingHorizontal: 40,
    paddingBottom: 50, // Added bottom margin
    marginTop: 20,
    gap: 22,
  },
  formItem: {
    gap: 8
  },
  formItemTitle:{
    color: Colors.light.secondary,
    marginLeft: 4,
    fontWeight: '600'
  },
  formTextInput: {
    backgroundColor: Colors.light.clearGray,
    padding: 14,
    borderRadius: 14
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 22
  },
  buttonText: {
    color: Colors.light.pureWhite,
    fontWeight: '700',
    fontSize: 16
  },
  signTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  }
});
