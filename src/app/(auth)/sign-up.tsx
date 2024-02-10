import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image';
import { useNavigation, router } from 'expo-router';

function SignUpScreen() {
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps='handled'>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name='arrow-back-outline' size={24}/>
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/login.png')} style={styles.image}/>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Cif</Text>
            <TextInput
              placeholder='22010480'
              style={styles.formTextInput}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Contraseña</Text>
            <TextInput
              placeholder='Elige tu contraseña'
              secureTextEntry
              style={styles.formTextInput}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Confirma tu contraseña</Text>
            <TextInput
              placeholder='Repite tu contraseña'
              secureTextEntry
              style={styles.formTextInput}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>¡Crear Cuenta!</Text>
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
    borderBottomLeftRadius: 15
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200
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
    marginLeft: 4
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
    fontWeight: '600',
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
