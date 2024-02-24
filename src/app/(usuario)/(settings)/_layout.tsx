import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='settingsScreen' />
        <Stack.Screen name='informacionPersonalScreen'/>
        <Stack.Screen name='fotoPerfilScreen'/>
        <Stack.Screen name='seguridadScreen'/>
        <Stack.Screen name='notificacionesScreen'/>
    </Stack>
  )
}
export default SettingsLayout;

const styles = StyleSheet.create({})