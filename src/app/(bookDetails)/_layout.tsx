import React from 'react'
import { Stack } from 'expo-router';
import 'react-native-reanimated';


function BookDetailsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name="id"/>
        <Stack.Screen name='bookPrestamoSuccess' />
        <Stack.Screen name='bookPrestamoVerification' />
        <Stack.Screen name='bookCalificarScreen'/>
    </Stack>
  )
}

export default  BookDetailsLayout;
