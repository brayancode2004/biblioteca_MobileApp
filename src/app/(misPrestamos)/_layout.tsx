import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

 function MisPrestamosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='showQrcodeScreen' options={{ presentation: 'modal'}}/>
        <Stack.Screen name='renovarPrestamo' options={{ presentation: 'modal'}}/>
    </Stack>
  )
}

export default MisPrestamosLayout;

const styles = StyleSheet.create({})