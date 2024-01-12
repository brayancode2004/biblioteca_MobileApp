import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/Home/SearchBar';

function DescubrirScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <SafeAreaView style={styles.container}>
            <SearchBar/>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default DescubrirScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 14
    }
})