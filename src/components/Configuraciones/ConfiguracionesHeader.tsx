import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated';


function ConfiguracionesHeader({ title } : { title: string} ) {
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name='arrow-back-outline' size={24} />
      </TouchableOpacity>
      <View style={styles.headerTitle}>
      <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={[styles.backBtn, {backgroundColor: 'transparent', borderColor: 'transparent'}]}>
      <Ionicons name='arrow-back-outline' size={24} color='transparent' />
      </View>
    </SafeAreaView>
  )
}

export default ConfiguracionesHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      backBtn: {
          padding: 8,
          backgroundColor: 'white',
          borderRadius: 20,
          borderColor: '#EEEEEE',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
      headerTitle: {
          alignItems: 'center',
      },
      titleText: {
          fontWeight: '600',
          fontSize: 19,
      },
})