import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

function GestionPrestamoSuccess() {
    const { message } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  )
}

export default GestionPrestamoSuccess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
})