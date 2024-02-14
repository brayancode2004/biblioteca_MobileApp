import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

 function QRCodesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='showQrcodeScreen' options={{ presentation: 'modal'}}/>
    </Stack>
  )
}

export default QRCodesLayout;

const styles = StyleSheet.create({})