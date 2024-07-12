import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import 'react-native-reanimated';


 function MisPrestamosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='showQrcodeScreen' options={{ presentation: 'modal'}}/>
        <Stack.Screen name='renovarPrestamo' options={{ presentation: 'modal'}}/>
        <Stack.Screen name='estadoEntregaPrestamo' options={{ presentation: 'modal'}}/>
        <Stack.Screen name='entregaSuccess' options={{ presentation: 'modal'}}/>
    </Stack>
  )
}

export default MisPrestamosLayout;

const styles = StyleSheet.create({})