import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons} from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../../constants/Colors';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';

function SocialScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <ConfiguracionesHeader title={'Social'}/>
        <Text>socialScreen</Text>
    </SafeAreaView>
  )
}

export default SocialScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.pureWhite
    },
})