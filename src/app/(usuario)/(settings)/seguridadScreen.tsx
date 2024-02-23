import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/Colors';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';

function SeguridadScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <ConfiguracionesHeader title={'Seguridad'}/>
        <Text>SeguridadScreen</Text>
    </SafeAreaView>
  )
}

export default SeguridadScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.light.pureWhite
    },
})