import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

function PrestamosGestionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='prestamosEntrega' options={{ presentation: 'modal'}}/>
    </Stack>
  )
}

export default PrestamosGestionLayout;

const styles = StyleSheet.create({})