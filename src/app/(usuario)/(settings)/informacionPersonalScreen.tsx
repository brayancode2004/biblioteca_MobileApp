import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import Colors from '../../../constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';
import { useAuth } from '../../../providers/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { actualizarInfoEstudiante, obtenerEstudiantePorId } from '../../../services/EstudianteService';
import { bibliotecaria, user } from '../../../types';
import LottieView from 'lottie-react-native';
import 'react-native-reanimated';


function InformacionPersonalScreen() {
    const { session, setSession } = useAuth();
    const [phone, setPhone] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] =  useState('');
    const [linkedin, setLinkedin] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
      setPhone(session && 'telefonoCelular' in session ? session.telefonoCelular: '');
      setDescripcion(session && 'descripcion' in session ? session.descripcion: '');
      if (session && 'facebook' in session) {
          setFacebook(session.facebook ?? '');
          setInstagram(session.instagram ?? '');
          setTwitter(session.twitter ?? '');
          setLinkedin(session.linkedin ?? '');
      }
  },[session]);

  useEffect(() => {
    const fetchUserData = async () => {
      if(session && 'cif' in session){
          const response = await obtenerEstudiantePorId(session.cif)
          setSession(response.data);
          setLoading(false)
      }
    }
    fetchUserData();
  },[])

  const handleUpdatePersonalInfo = async () => {
    try {
      setUpdating(true)
      if (session && 'cif' in session) {
        const updatedData = {
          cif: session.cif,
          telefonoCelular: phone,
          descripcion: descripcion,
          facebook: facebook,
          instagram: instagram,
          twitter: twitter,
          linkedin: linkedin
        };
        await actualizarInfoEstudiante(updatedData);
        setSession((prevSession: user | bibliotecaria | null) => ({
          ...(prevSession as user | bibliotecaria), // Asegúrate de que prevSession sea de tipo user o bibliotecaria
          telefonoCelular: updatedData.telefonoCelular,
          descripcion: updatedData.descripcion,
          facebook: updatedData.facebook,
          instagram: updatedData.instagram,
          twitter: updatedData.twitter,
          linkedin: updatedData.linkedin
        }));
      }
      setUpdating(false)
      setUpdated(true);
    } catch (e) {
      console.warn(e);
      setUpdating(false)
    }
  };
  
  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }else if (updated) {
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
        <Text style={styles.animationTitle}>¡Información Actualizada!</Text>
      </View>
    );
  }else{
    return (
          <View style={styles.container}>
            <ConfiguracionesHeader title={'Información Personal'}/>
            <KeyboardAwareScrollView style={styles.formContainer} contentContainerStyle={{ gap: 22}} showsVerticalScrollIndicator={false}>
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Nombre Completo:</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="clipboard" size={24} color={Colors.light.primary} />
                  <TextInput
                    value={session?.nombreCompleto}
                    style={[styles.formTextInput, { color: Colors.light.gray, fontWeight: '700'}]}
                    editable={false}
                  />
                </View>
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Correo Institucional:</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail" size={24} color={Colors.light.primary} />
                  <TextInput
                    value={session?.correoInstitucional}
                    style={[styles.formTextInput, { color: Colors.light.gray, fontWeight: '700'}]}
                    editable={false}
                  />
                </View>
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Número de teléfono:</Text>
                <View style={styles.inputContainer}>
                  <FontAwesome5 name="phone-alt" size={24} color={Colors.light.primary} />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.formTextInput}
                  />
                </View>
              </View>
              {/* Redes Sociales */}
              <Text style={styles.subtitle}>Redes Sociales:</Text>
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Facebook:</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="logo-facebook" size={24} color={Colors.light.primary} />
                  <TextInput
                    value={facebook}
                    onChangeText={setFacebook}
                    style={styles.formTextInput}
                    placeholder='https://facebook.com/juanitoalcachofa'
                    placeholderTextColor={Colors.light.gray}
                  />
                </View>
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Instagram:</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="logo-instagram" size={24} color={Colors.light.primary} />
                  <TextInput
                    value={instagram}
                    onChangeText={setInstagram}
                    style={styles.formTextInput}
                    placeholder='https://instagram.com/juanitoalcachofa'
                    placeholderTextColor={Colors.light.gray}
                  />
                </View>
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Twitter/X:</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="logo-twitter" size={24} color={Colors.light.primary} />
                  <TextInput
                    value={twitter}
                    onChangeText={setTwitter}
                    style={styles.formTextInput}
                    placeholder='https://twitter.com/juanitoalcachofa'
                    placeholderTextColor={Colors.light.gray}
                  />
                </View>
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Linkedin:</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="logo-linkedin" size={24} color={Colors.light.primary} />
                  <TextInput
                    value={linkedin}
                    onChangeText={setLinkedin}
                    style={styles.formTextInput}
                    placeholder='https://linkedin.com/juanitoalcachofa'
                    placeholderTextColor={Colors.light.gray}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
            {/* BottomTab */}
            <View style={{ flex: 1}}>
              <View style={styles.containerBtn}>
                  <TouchableOpacity style={styles.prestarBtn}  disabled={updating} onPress={handleUpdatePersonalInfo}>
                      <Text style={styles.prestarText}>{ updating ? 'Actualizando...' : 'Actualizar' }</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
    );
  }
}

export default InformacionPersonalScreen;

const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.light.pureWhite
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
    borderRadius: 11
  },  
  subtitle: {
    marginTop: 11,
    color: Colors.light.primary,
    fontFamily: 'InterSemi',
    fontSize: 19,
    alignSelf: 'center'
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
});
