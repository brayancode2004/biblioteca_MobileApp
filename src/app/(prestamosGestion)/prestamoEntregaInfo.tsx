import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { entregarLibro, escanearQr, obtenerPrestamoPorCodigoRetiro, recibirLibro } from '../../services/PrestamosService';
import Colors from '../../constants/Colors';
import { prestamo } from '../../types';
import { Image } from 'expo-image';
import BookInfoSection from '../../components/BookDetails/BookInfoSection';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons'
import { useAuth } from '../../providers/AuthProvider';

function PrestamoEntregaInfo() {
    const { session } = useAuth();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [prestamo, setPrestamo] = useState<prestamo>();
    const [error, setError] = useState(false);
    const { codigoretiro, manual } = useLocalSearchParams();


    const handleBuscarPrestamo = async () => {
        try{
            if(manual){
                const prestamoInfo = await obtenerPrestamoPorCodigoRetiro(codigoretiro)
                setPrestamo(prestamoInfo);
                console.log('manual')
            }else{
                const prestamoInfo = await escanearQr(codigoretiro);
                setPrestamo(prestamoInfo);
                console.log('qr')
            }
        }catch(e: any){
            setError(true);
        }finally{
            setLoading(false)
        }
    }

    const handlePrestamoRecepcion = async () => {
        if(prestamo?.estado === 'aprobado' && session && 'id' in session){
            setLoading2(true)
            try{
                await entregarLibro(prestamo.idPrestamo,session.id, manual ? false : true)
                setLoading2(false)
                router.replace( { params: { message: 'Entrega Confirmada con éxito'}, pathname: '(prestamosGestion)/gestionPrestamoSuccess'} );
            }catch(error: any){
                const mensajeError = error.response && error.response.data && typeof error.response.data === 'object' 
                ? error.response.data.message 
                : error.response.data;
                setLoading2(false)
                Alert.alert('No se pudo confirmar la Entrega', mensajeError)
            }

        }else if(prestamo?.estado === 'en ejecución' && session && 'id' in session){
            setLoading2(true)
            try{
                await recibirLibro(prestamo.idPrestamo, session.id, manual ? false : true)
                setLoading2(false)
                router.replace( { params: { message: 'El Libro ha sido devuelto con éxito'}, pathname: '(prestamosGestion)/gestionPrestamoSuccess'} );
            }catch(error: any){
                const mensajeError = error.response && error.response.data && typeof error.response.data === 'object' 
                ? error.response.data.message 
                : error.response.data;
                setLoading2(false)
                Alert.alert('No se pudo confirmar la Devolución', mensajeError)
            }
        }
    }

    useEffect(() => {
        handleBuscarPrestamo();
    },[])


    if(loading){
        return(
            <View style={[styles.containerDos, {gap: 17}]}>
                <ActivityIndicator size="large" color={Colors.light.primary} /> 
                <Text style={styles.searchingText}>Buscando Préstamo...</Text>
            </View>
        )
    }else{
        return (
            <>
                {
                    !error && prestamo ? (
                        <View style={styles.container}>
                            <View style={styles.infoSectionContainer}>
                                <BookInfoSection book={prestamo?.libro} prestamo={false} calificacion={false} delivery={true}/>
                            </View>
                            {/* Description */}
                            <View style={styles.descriptionContainer}>
                                <Text style={[styles.descriptionTitles, {marginTop: 0}]}>Prestatario:</Text>
                                <View style={styles.autorContainer}>
                                    <Image source={{ uri: prestamo.estudiante.userPic}} style={styles.autorPic}/>
                                    <View>
                                        <Text style={styles.autorName}>{prestamo.estudiante.nombreCompleto}</Text>
                                    </View>
                                </View>
                                <View style={[styles.descriptionItems, {paddingLeft: 11}]}>
                                    <FontAwesome5 name="calendar-alt" size={40} color={Colors.light.primary} />
                                    <Text style={styles.descriptionItemsTitle}>Fecha de Devolución:</Text>
                                    <Text style={styles.descriptionItemsSubtitle}>{prestamo.fechaDevolucion}</Text>
                                </View>
                                <Text style={[styles.descriptionTitles, {marginTop: 18}]}>Ubicación del Libro:</Text>
                                <View style={styles.ubicacionContainer}>
                                    <View style={styles.descriptionItems}>
                                        <MaterialIcons name="shelves" size={40} color={Colors.light.primary} />
                                        <Text style={styles.descriptionItemsTitle}>Estante:</Text>
                                        <Text style={styles.descriptionItemsSubtitle}>{prestamo.libro.ubicacion.numEstante}</Text>                                    
                                    </View>
                                    <View style={styles.descriptionItems}>
                                        <MaterialCommunityIcons name="bookshelf" size={40} color={Colors.light.primary} />
                                        <Text style={styles.descriptionItemsTitle}>Repisa:</Text>
                                        <Text style={styles.descriptionItemsSubtitle}>{prestamo.libro.ubicacion.numRepisa}</Text>
                                    </View>
                                </View>


                            </View>

                            {/* Buttons */}
                            <View style={styles.buttonsContainer}>
                                <View style={styles.containerBtn}>     
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.date} onPress={() => router.back()}>Cancelar</Text>
                                    </View>
                                    <TouchableOpacity style={styles.prestarBtn}  disabled={loading2} 
                                        onPress={handlePrestamoRecepcion}
                                    >
                                        <Text style={styles.prestarText}>
                                            {loading2 ? (
                                                prestamo.estado === 'aprobado' ? 'Entregando...' : (prestamo.estado === 'en ejecución' ? 'Devolviendo...' : '')
                                            ) : (
                                                prestamo.estado === 'aprobado' ? 'Confirmar Entrega' : (prestamo.estado === 'en ejecución' ? 'Confirmar Devolución' : '')
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) :(
                        <View style={styles.containerDos}>
                            <Text style={styles.errorTitle}>Oups!</Text>
                            <Image source={require('../../../assets/error.svg')} style={styles.errorImagen}/>
                            <Text style={styles.errorSubtitle}>Ha ocurrido un error!</Text>
                            <View style={styles.detallesContainer}>
                            <Text style={styles.errorReason}>No hemos podido encontrar el préstamo</Text>
                            </View>
                            <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
                            <Text style={styles.btnBackTitle}>Volver</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </>
        )
    }
}

export default PrestamoEntregaInfo


const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    infoSectionContainer: {
        flex: 2.8,
    },
    descriptionContainer: {
        flex: 2,
        marginTop: 15,
        paddingTop: 25,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        gap: 17,
        borderTopWidth: 2,
        borderTopColor: '#E5E5E5',
    },
    buttonsContainer: {
        height: 100,
    },
    containerDos: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 17
    },
    searchingText: {
        color: Colors.light.primary,
        fontSize: 17,
        fontWeight: '600',
    },
    errorTitle: {
        color: Colors.light.primary,
        fontFamily: 'InterSemi',
        fontSize: 36
      },
      errorSubtitle: {
        color: Colors.light.secondary,
        fontFamily: 'InterSemi',
        fontSize: 22
      },
      errorImagen: {
        width: 200,
        height: 200
      },
      errorReason: {
        color: Colors.light.gray,
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center'
      },
      detallesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      ubicacionContainer: {
        flexDirection: 'row', 
        // justifyContent: 'center', 
        gap: 11
      },
      descriptionTitles: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.light.secondary,
        // alignSelf: 'center'
      },
      descriptionItems: {
        flexDirection: 'row',
        gap: 11,
        alignItems: 'center'
      },
      descriptionItemsTitle: {
        fontSize: 17,
        fontWeight:'700',
        color: Colors.light.gray,
      },
      descriptionItemsSubtitle: {
        fontSize: 15,
        fontWeight:'500',
      },
      autorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11
    },
    autorPic: {
        width: 75,
        height: 75,
        borderRadius: 37.5
    },
    autorName: {
        fontSize: 17,
        fontWeight: '500',
        // color: Colors.light.gray,

    },
      btnBack: {
        backgroundColor: Colors.light.primary,
        flexDirection: 'row',
        width: '80%',
        height: '5%',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17,
        gap: 11
      },
      btnBackTitle: {
        color: Colors.light.white,
        fontFamily: 'InterBold',
        fontSize: 16
      },
      containerBtn: {
        position: 'absolute',
        flex: 1,
        display: 'flex',
        bottom: 0,
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
    dateContainer: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 11
    },
    dateTitle: {
        color: 'gray',
        fontWeight: '600'
    },
    date: {
        color: '#F9410B',
        fontWeight: '600',
        fontSize: 19
        ,
    },
    prestarBtn: {
        flex: 1,
        flexDirection: 'row',
        gap: 11,
        backgroundColor: '#F9410B',
        justifyContent: 'center',
        alignItems: 'center',
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