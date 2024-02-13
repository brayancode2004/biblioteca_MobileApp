import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image';
import { useNavigation, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { registerEstudiante } from '../../services/EstudianteService';
import { useAuth } from '../../providers/AuthProvider';
import { guardarUsuario } from '../../utils/Functions';
import { AxiosError } from 'axios';

function SignUpScreen() {
  const navigation = useNavigation()
  const { setSession } = useAuth()
  const [cif, setCif] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    setLoading(true)
    if(password === confirmPassword){
      try {
        const credencialesAEnviar = { cif: cif, password: password } 
        const usuario = await registerEstudiante(credencialesAEnviar);
        // Guardando la info del usuario para que persista en las sesión
        guardarUsuario(usuario)
        setSession(usuario.data)
        setLoading(false)
        router.push('(auth)/onboardingScreen');
      }catch(e){
        setLoading(false)
        Alert.alert(e.response.data)
      }
    } else{
      // Esto es lo que pasa si las dos contraseñas ingresadas no coinciden 
        setLoading(false)
        Alert.alert("Las contraseñas ingresadas no coinciden")

    }

  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} 
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name='arrow-back-outline' size={24}/>
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/signup.png')} style={styles.image}/>
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
              placeholder='Elige tu contraseña'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.formTextInput}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Confirma tu contraseña</Text>
            <TextInput
              placeholder='Repite tu contraseña'
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.formTextInput}
            />
          </View>
          <TouchableOpacity disabled={loading} style={styles.button} onPress={onSignUp}>
            <Text style={styles.buttonText}>{loading ? 'Creando tu cuenta...' : '¡Crear Cuenta!'}</Text>
          </TouchableOpacity>
          <View style={styles.signTextContainer}>
            <Text style={styles.signQuestion}>¿Ya tienes una cuenta?</Text>
            <Text style={styles.signLink} onPress={() => router.push('(auth)/sign-in')}> Inicia Sesión</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen;

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
    width: 185,
    height: 130
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.light.pureWhite,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 32,
    paddingHorizontal: 40,
    marginTop: 20,
    gap: 22
  },
  formItem: {
    gap: 8
  },
  formItemTitle:{
    color: Colors.light.secondary,
    marginLeft: 4,
    fontWeight:'600'
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
  }
});
