import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/Descubrir/SearchBar';

function PrestamosControlScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <SafeAreaView style={styles.container}>
          <Text>Control de Préstamos</Text>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PrestamosControlScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 14
    }
})