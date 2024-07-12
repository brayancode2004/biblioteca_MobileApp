import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import 'react-native-reanimated';


export default function Header({ title } : { title: string}) {
  return (        
    <SafeAreaView>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Ionicons name='arrow-back-outline' size={24}/>
            </TouchableOpacity>

            <View style={styles.headerTitle}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        
            <TouchableOpacity 
            style={styles.favoriteBtn}
            disabled={true}
            >
                <AntDesign name={'hearto'} size={24} color={'transparent'}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

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
        marginLeft: 8,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      headerTitle: {
        alignItems: 'center',
      },
      titleText: {
        fontWeight: '600',
        fontSize: 19
      },
      favoriteBtn:{
        padding: 8,
        backgroundColor: 'transparent',
        borderRadius: 20,
        marginRight: 8,
        borderColor: Colors.light.pureWhite,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
})