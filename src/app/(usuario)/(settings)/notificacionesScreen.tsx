import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../../constants/Colors';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';

function NotificacionesScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <ConfiguracionesHeader title={'Notificaciones'}/>
        <Text>NotificacionesScreen</Text>
    </SafeAreaView>
  )
}

export default NotificacionesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.pureWhite
    },
})