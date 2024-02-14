import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { prestamo } from '../../types';
import Colors from '../../constants/Colors';
import { formatearFecha, getColorPorEstado } from '../../utils/Functions';

function PrestamoItem({ prestamo }: {prestamo: prestamo}) {
    return (
        <View style={styles.container}>
          <Image
            source={{ uri: prestamo.libro.imagen}}
            style={styles.image}
            contentFit='fill'
          />
    
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{prestamo.libro.titulo}</Text>
            <View style={styles.subtitleContainer}>
              <Text style={[styles.estado, { color: getColorPorEstado(prestamo.estado) }]}>{prestamo.estado.toUpperCase()}</Text>
              <View>
                <Text style={styles.subtitle}>Devolución:</Text>
                <Text style={{fontWeight: '300'}}>{formatearFecha(prestamo.fechaDevolucion)}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Código Retiro:</Text>
                <Text style={{fontWeight: '300'}}>{prestamo.codigoRetiro}</Text>
              </View>
            </View>
          </View>
          <View style={styles.quantitySelector}>
            <MaterialCommunityIcons
            //   onPress={() => updateQuantity(cartItem.id, -1)}
              size={35}
              name="qrcode-scan"
              color={Colors.light.primary}
              style={{ padding: 5 }}
            />

            <TouchableOpacity style={styles.renovartBtn}>
                <Text style={styles.renovarText}>Renovar</Text>
            </TouchableOpacity>
    
          </View>
        </View>
      );
    };
    
    export default PrestamoItem

    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        paddingBottom: 11,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
      },
      image: {
        width: 100,
        height: 150,
        alignSelf: 'center',
        marginRight: 10,
        borderRadius: 11
      },
      title: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 5,
      },
      subtitleContainer: {
        gap: 5,
      },
      subtitle: {
        fontWeight: '500'
      },
      quantitySelector: {
        gap: 17,
        alignItems: 'center',
        marginVertical: 10,
      },
      estado: {
        fontWeight: 'bold',
      },
      renovartBtn: {
        backgroundColor: Colors.light.primary,
        padding: 8,
        borderRadius: 6
      },
      renovarText: {
        color: Colors.light.pureWhite,
        fontWeight: '700'
      },
    });