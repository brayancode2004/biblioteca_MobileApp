import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import 'react-native-reanimated';


function PrestamosGestionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='prestamosQr' options={{ presentation: 'modal'}}/>
        <Stack.Screen name='prestamoEntregaInfo' options={{ presentation: 'fullScreenModal'}}/>
        <Stack.Screen name='gestionPrestamoSuccess' options={{ presentation: 'fullScreenModal'}}/>
    </Stack>
  )
}

export default PrestamosGestionLayout;

const styles = StyleSheet.create({})