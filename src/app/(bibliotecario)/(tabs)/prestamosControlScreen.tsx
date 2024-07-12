import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/Descubrir/SearchBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import 'react-native-reanimated';


function PrestamosControlScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <SafeAreaView style={styles.container}>
          <Text>Control de Préstamos</Text>
          <TouchableOpacity onPress={() => router.push('(prestamosGestion)/prestamosQr')} style={styles.backBtn}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PrestamosControlScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 14
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
})