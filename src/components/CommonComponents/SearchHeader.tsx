import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
import 'react-native-reanimated';



function SearchHeader({ tipo } : { tipo: string}) {
  return (
    <View style={[styles.header, tipo === 'discover' &&  
        {borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 11}]}
    >
        <View>
        <Text style={styles.title1}>{tipo === 'discover' ? 'Te Podría' : 'Inventario'}</Text>
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'flex-end'}}>
            <Text style={styles.title2}>{tipo === 'discover' ? 'Interesar' : 'Management'}</Text>
            <FontAwesome name="arrow-down" size={20} color={Colors.light.primary} />
        </View>
        </View>
        {/* Boton de busqueda */}
        <TouchableOpacity style={styles.iconContainer} 
        onPress={() => router.push(tipo === 'discover' ? '/searchScreen' : '')}
        >
            <FontAwesome name="search" size={22} color={Colors.light.primary} />
        </TouchableOpacity>
  </View>
  )
}

export default SearchHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 11
      },
      title1: {
        fontSize: 22,
        color: Colors.light.gray,
        fontWeight: '700'
      },
      title2: {
        fontSize: 22,
        color: Colors.light.primary,
        fontFamily: 'InterBold',
      },
      iconContainer: {
        width: 50,
        height: 50,
        backgroundColor: Colors.light.clearGray,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
      },
})