import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function ConfiguracionesBottomTab() {
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1}}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.prestarBtn}  disabled={loading}>
                <Text style={styles.prestarText}>{ loading ? 'Actualizando...' : 'Actualizar' }</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ConfiguracionesBottomTab;


const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        height:  windowHeight > 850 ? 100 : 80,
        width: '100%',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        paddingBottom: windowHeight > 850 ? 20 : 10,
        paddingTop: windowHeight > 850 ? 10 : 5,
        padding: 11,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,  
        elevation: 5,
        backgroundColor: '#fff'
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
        elevation: 8, // Sombras en Android
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