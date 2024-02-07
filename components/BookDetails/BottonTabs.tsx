import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { Foundation } from '@expo/vector-icons';

function BottonTabs() {
  return (
    <View style={styles.container}>
        <View style={styles.dateContainer}>
            <Text style={styles.dateTitle}>Devolución:</Text>
            <Text style={styles.date}>25 FEBRERO 2024</Text>
        </View>
      <TouchableOpacity style={styles.prestarBtn}>
        <Text style={styles.prestarText}>Prestar</Text>
        <Foundation name='book-bookmark' size={24} color='white'/>
      </TouchableOpacity>
    </View>
  )
}

export default BottonTabs;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        width: '100%',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,  
        elevation: 5,
        backgroundColor: '#fff'
        },
    dateContainer: {
        flex: 0.8,
        justifyContent: 'center',
        marginLeft: 22,
    },
    dateTitle: {
        color: 'gray',
        fontWeight: '600'
    },
    date: {
        color: '#F9410B',
        fontWeight: '600',
        fontSize: 16
        ,
    },
    prestarBtn: {
        flex: 1,
        flexDirection: 'row',
        gap: 11,
        backgroundColor: '#F9410B',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 28,
        elevation: 5, // Sombras en Android
        shadowColor: '#000', // Sombras en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    prestarText: {
        fontSize: 18,
        lineHeight: 22,
        color: 'white',
        fontWeight: '600'
    }
})