import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function DescubrirLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='descubrirScreen'/>
        <Stack.Screen name='searchScreen' />
    </Stack>
  )
}

const styles = StyleSheet.create({})