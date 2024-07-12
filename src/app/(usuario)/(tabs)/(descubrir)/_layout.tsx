import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import 'react-native-reanimated';



export default function DescubrirLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='descubrirScreen'/>
        <Stack.Screen name='searchScreen' />
    </Stack>
  )
}

const styles = StyleSheet.create({})