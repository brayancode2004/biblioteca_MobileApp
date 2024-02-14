import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native'
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';


function ShowQrcodeScreen() {
    const { codigoRetiro } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name='arrow-back-outline' size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
                <Text style={styles.titleText}>QR A Scanear</Text>
            </View>
          <View>
            <Ionicons name='arrow-back-outline' size={24} color='transparent'/>
          </View>
      </View>
      <View style={styles.qrCodeContainer}>
        <View style={styles.qrCodeArea}>
          <Text style={styles.qrCodeTitle}>Este QR debe ser escaneado por el personal bibliotecario</Text>
          <QRCode value={codigoRetiro?.toString()} size={240}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ShowQrcodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: Colors.light.primary
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      marginTop: 4,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    backBtn: {
      padding: 6,
      backgroundColor: 'white',
      marginLeft: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 11,
        },
      }),
    },
    headerTitle: {
      display: 'flex'
    },
    titleText: {
      fontWeight: '600',
      fontSize: 19,
      color: Colors.light.pureWhite,
      textAlign: 'center'
    },
    qrCodeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    qrCodeArea: {
      backgroundColor: Colors.light.pureWhite,
      gap: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 22,
      paddingVertical: 78,
      paddingHorizontal: 50
    },
    qrCodeTitle:{
      fontWeight: '600',
      textAlign: 'center',
      color: Colors.light.gray
    }
})