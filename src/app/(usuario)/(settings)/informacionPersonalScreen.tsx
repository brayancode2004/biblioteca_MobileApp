import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Colors from '../../../constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';
import { useAuth } from '../../../providers/AuthProvider';
import ConfiguracionesBottomTab from '../../../components/Configuraciones/ConfiguracionesBottomTab';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function InformacionPersonalScreen() {
    const { session } = useAuth();
    const [phone, setPhone] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] =  useState('');
    const [linkedin, setLinkedin] = useState('');
    const [loading, setLoading] = useState(false);

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
          <ConfiguracionesBottomTab/>
        </View>
  );
}

export default InformacionPersonalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.light.pureWhite
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
  }
});
