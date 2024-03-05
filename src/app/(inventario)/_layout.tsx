import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

 function InventarioLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='book'/>
    </Stack>
  )
}

export default InventarioLayout;