import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { prestamoDTO } from '../../types';
import Colors from '../../constants/Colors';
import { formatearFecha, getColorPorEstado } from '../../utils/Functions';
import { router } from 'expo-router';
import { renovarPrestamo } from '../../services/PrestamosService';
import { useAuth } from '../../providers/AuthProvider';
import 'react-native-reanimated';


function PrestamoItem( {prestamo} : {prestamo : prestamoDTO} ) {
  const { session } = useAuth();
  const [renovando, setRenovando] = useState(false)
  
  const handleRenovar = async () => {
    setRenovando(true)
    try{
      if(session && 'cif' in session){
        const respuestaRenovacion = await renovarPrestamo(session.cif, prestamo.idPrestamo)
        setRenovando(false)
        router.push({params: {fechaDevolucion: respuestaRenovacion.fechaDevolucion},   pathname: '(misPrestamos)/renovarPrestamo'})
      }
    }catch(e : any){
      const mensajeError = e.response && e.response.data && typeof e.response.data === 'string' 
      ? e.response.data 
      : 'No se pudo renovar tu préstamo debido a un error inesperado.';
      setRenovando(false)
      router.push({params: {error: mensajeError},  pathname: '(misPrestamos)/renovarPrestamo'})
    }
  }

    return (
        <View style={styles.container}>
          <Image
            source={{ uri: prestamo.libroImagen}}
            style={styles.image}
            contentFit='fill'
          />
    
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{prestamo.libroTitulo}</Text>
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
            {
              prestamo.estado !== 'finalizado' && prestamo.estado !== 'multado' && (
                <MaterialCommunityIcons
                  onPress={() => router.push({ params: { codigoRetiro: prestamo.codigoRetiro}, pathname: '(misPrestamos)/showQrcodeScreen' })}
                  size={35}
                  name="qrcode-scan"
                  color={Colors.light.primary}
                  style={{ padding: 5 }}
                />
              )
            }
            { prestamo.estado === 'en ejecución' && (
                <TouchableOpacity style={styles.renovartBtn} onPress={handleRenovar} disabled={renovando}>
                    <Text style={styles.renovarText}>{renovando ? 'Renovando...' : 'Renovar'}</Text>
                </TouchableOpacity>
              )
            }
            {
              prestamo.estado === 'multado' && (
                <TouchableOpacity style={[styles.renovartBtn, {backgroundColor: 'red'}]} onPress={handleRenovar} disabled={renovando}>
                    <Text style={styles.renovarText}>Ver Multa</Text>
                </TouchableOpacity>
              )
            }

    
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