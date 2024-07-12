import React, { useState } from 'react'
import { Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';
import { useAuth } from '../../../providers/AuthProvider';
import { cambiarPasswordEstudiante } from '../../../services/EstudianteService';
import LottieView from 'lottie-react-native';
import 'react-native-reanimated';


function SeguridadScreen() {
  const { session } = useAuth();
  const [actualpassword, setActualPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [errors, setErrors] = useState('');

  const validateInputs = () => {
    setErrors('')
    if(!actualpassword){
      setErrors('Tu contraseña actual es requerida.')
      return false;
    }
    if(!password){
      setErrors('Debes ingresar una contraseña nueva.')
      return false
    }
    if(!setConfirmPassword){
      setErrors('Debes confirmar la nueva contraseña.')
      return false
    }
    if(password !== confirmPassword){
      setErrors('Las contraseñas nuevas no coinciden.')
      return false;
    }
    return true;
  }
  
  const handleChangePassword = async () => {
    if(!validateInputs()){
      return;
    }
    try{
      setUpdating(true)
      const passwordsCredentials = {
        cif: session && 'cif' in session && session.cif,
        oldPassword: actualpassword,
        newPassword: password
      }
      await cambiarPasswordEstudiante(passwordsCredentials)
      setUpdating(false)
      setUpdated(true)
      setActualPassword('')
      setPassword('')
      setConfirmPassword('')
    }catch(e: any){
      const errorMessage = e.response && e.response.data ? e.response.data : 'Error al cambiar la contraseña';
      setErrors(errorMessage)
      setUpdating(false)
    }
  }

  if (updated) {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          loop={false}
          autoPlay
          style={{
            width: '44%',
            maxWidth: 400,
          }}
          source={require('../../../../assets/lottie/check.json')}
          onAnimationFinish={() => setUpdated(false)}
        />
        <Text style={styles.animationTitle}>¡Contraseña Cambiada!</Text>
      </View>
    );
  }else{
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
          <ConfiguracionesHeader title={'Seguridad'}/>
          <Text style={styles.subtitle}>Edita tu contraseña en este apartado de seguridad</Text>
          <View style={styles.formContainer}>
          <View style={styles.formItem}>
              <Text style={styles.formItemTitle}>Contraseña Actual</Text>
              <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={24} color={Colors.light.primary} />
              <TextInput
                placeholder='Ingresa tu contraseña actual'
                secureTextEntry
                value={actualpassword}
                onChangeText={setActualPassword}
                style={styles.formTextInput}
              />
              </View>
            </View>
            <View style={styles.formItem}>
              <Text style={styles.formItemTitle}>Nueva Contraseña</Text>
              <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={24} color={Colors.light.primary} />
              <TextInput
                placeholder='Ingresa la nueva contraseña'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.formTextInput}
              />
              </View>
            </View>
            <View style={styles.formItem}>
              <Text style={styles.formItemTitle}>Repetir nueva contraseña</Text>
              <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={24} color={Colors.light.primary} />
                <TextInput
                  placeholder='Vuelve a escribir tu nueva contraseña'
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.formTextInput}
                />
              </View>
            </View>
            <Text style={{ color: 'red', fontWeight: '500'}}>{errors}</Text>
          </View>
          <View style={{ flex: 1}}>
            <View style={styles.containerBtn}>
              <TouchableOpacity style={styles.prestarBtn}  disabled={updating} onPress={handleChangePassword}>
                <Text style={styles.prestarText}>{ updating ? 'Cambiando Contraseña...' : 'Cambiar Contraseña' }</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default SeguridadScreen

const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.light.pureWhite,
        gap: 22
    },
    animationContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 17,
    },
    animationTitle: {
      color: Colors.light.secondary,
      fontFamily: 'InterBold',
      fontSize: 22
  },
    subtitle: {
      alignSelf: 'center',
      textAlign: 'center',
      color: Colors.light.primary,
      fontFamily: 'InterSemi',
      fontSize: 15,
      paddingHorizontal: 40
    },
    formContainer: {
      paddingHorizontal: 40,
      gap: 22,
      marginTop: 11,
      marginBottom: 100
    },
    formItem: {
      gap: 8
    },
    formItemTitle:{
      color: Colors.light.secondary,
      marginLeft: 4,
      fontWeight:'600'
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.light.clearGray,
      borderRadius: 11,
      paddingHorizontal: 10,
    },
    formTextInput: {
      backgroundColor: Colors.light.clearGray,
      padding: 14,
      borderRadius: 14
    },
    containerBtn: {
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
      padding: 11,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.10,
      shadowRadius: 8,  
      elevation: 5,
      backgroundColor: '#fff'
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