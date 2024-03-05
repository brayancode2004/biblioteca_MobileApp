import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Header from '../../components/CommonComponents/Header';
import Colors from '../../constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { book } from '../../types';
import { actualizarLibro, crearLibroConAutoresYUbicacion, deshabilitarLibro, obtenerLibroPorId } from '../../services/LibrosService';
import { useAuth } from '../../providers/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import { obtenerTodosLosAutores } from '../../services/AutorService';
import { obtenerTodasLasCategorias } from '../../services/CategoriaService';

function Book() {
    const { idLibro, tipo } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: '',
        sinopsis: '',
        imagen: '',
        añoPublicacion: '',
        isbn: '',
        numCopiasTotales: '',
        numCopiasDisponibles: '',
        numEstante: '',
        numRepisa: '',
        autoresId: [],
        categoriasId: []
    });
    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [modoActualizarEliminar, setModoActualizarEliminar] = useState(false);
    const [actualizado, setActualizado] = useState(false);
    const [guardado, setGuardado] = useState(false);
    const [eliminado, setEliminado] = useState(false);
    const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const fetchAutores = async () => {
        try {
            setFetching(true)
            const autoresData = await obtenerTodosLosAutores();
            setAutores(autoresData);
            setFetching(false)
        } catch (error) {
            setFetching(false)
            Alert.alert('Error al obtener autores');
        }
    };

    const fetchCategorias = async () => {
        try {
            setFetching(true)
            const categoriasData = await obtenerTodasLasCategorias();
            setCategorias(categoriasData);
            setFetching(false)
        } catch (error) {
            setFetching(false)
            Alert.alert('Error al obtener categorías');
        }
    };

 
      
      const handleGuardarLibro = async () => {
        try {
          setLoading(true);
          // No es necesario actualizar nuevoLibro aquí, ya se ha actualizado con useEffect
          if (modoActualizarEliminar) {
            await actualizarLibro(idLibro, nuevoLibro);
            setLoading(false);
            setActualizado(true);
          } else {
            await crearLibroConAutoresYUbicacion(nuevoLibro);
            setLoading(false);
            setGuardado(true);
          }
          // Lógica adicional después de guardar el libro, por ejemplo, redireccionar a otra pantalla
        } catch (e) {
          setLoading(false);
          Alert.alert(e.message);
        }
      };
      

    const handleEliminarLibro = async () => {
        try {
            setLoading(true);
            await deshabilitarLibro(idLibro);
            setLoading(false);
            setEliminado(true)
            // Lógica adicional después de eliminar el libro, por ejemplo, redireccionar a otra pantalla
        } catch (e : any) {
            setLoading(false);
            Alert.alert(e.message);
        }
    }

    const renderizarImagen = () => {
        if (nuevoLibro?.imagen) {
            return (
                <Image
                    source={{ uri: nuevoLibro.imagen }}
                    style={styles.imagen}
                />
            );
        } else {
            return null;
        }
    }

    const confirmarEliminar = () => {
        Alert.alert('Confirmar', '¿Estás seguro de eliminar este libro?',[
            {
                text: 'Cancelar',
            },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: handleEliminarLibro
            }
        ])
    }
         
    useEffect(() => {
        fetchAutores();
        fetchCategorias();
    
        if (tipo === 'actualizar/eliminar') {
            setModoActualizarEliminar(true);
            fetchBook(); // Obtener el libro existente para actualizar
        } else {
            setModoActualizarEliminar(false);
        }
    }, []);

    useEffect(() => {
        setNuevoLibro(prevLibro => ({
            ...prevLibro,
            autoresId: autoresSeleccionados,
            categoriasId: categoriasSeleccionadas
        }));
    }, [autoresSeleccionados, categoriasSeleccionadas]);
    
    // Función para cargar los autores y categorías seleccionados del libro existente
    const cargarAutoresYCategoriasSeleccionadas = (libro) => {
        const autoresSeleccionadosLibro = libro.autores.map(autor => autor.idAutor);
        const categoriasSeleccionadasLibro = libro.categorias.map(categoria => categoria.idCategoria);
        setAutoresSeleccionados(autoresSeleccionadosLibro);
        setCategoriasSeleccionadas(categoriasSeleccionadasLibro);
    };
    
    // Función para manejar la obtención exitosa del libro existente
    const handleFetchBookSuccess = (libro) => {
        cargarAutoresYCategoriasSeleccionadas(libro);
        setNuevoLibro({
            titulo: libro.titulo,
            sinopsis: libro.sinopsis,
            imagen: libro.imagen,
            añoPublicacion: libro.añoPublicacion,
            isbn: libro.isbn,
            numCopiasTotales: libro.numCopiasTotales,
            numCopiasDisponibles: libro.numCopiasDisponibles,
            numEstante: libro.ubicacion ? libro.ubicacion.numEstante : '',
            numRepisa: libro.ubicacion ? libro.ubicacion.numRepisa : '',
            autoresId: autoresSeleccionados,
            categoriasId: categoriasSeleccionadas
        });
    };
    
    const fetchBook = async () => {
        try {
            setFetching(true);
            const libro = await obtenerLibroPorId(idLibro);
            handleFetchBookSuccess(libro);
            setFetching(false);
        } catch (e) {
            setFetching(false);
            Alert.alert(e.message);
        }
    };
    

    const onFinishAnimation = () => {
        setActualizado(false)
        setGuardado(false)
        setEliminado(false)
        router.back()
    }

    const toggleAutor = (autorId) => {
        if (autoresSeleccionados.includes(autorId)) {
          // Si el autor ya está seleccionado, quitarlo de la lista
          setAutoresSeleccionados(autoresSeleccionados.filter((id) => id !== autorId));
        } else {
          // Si el autor no está seleccionado, agregarlo a la lista
          setAutoresSeleccionados([...autoresSeleccionados, autorId]);
        }
      };
    
      const toggleCategoria = (categoriaId) => {
        if (categoriasSeleccionadas.includes(categoriaId)) {
          // Si la categoría ya está seleccionada, quitarla de la lista
          setCategoriasSeleccionadas(categoriasSeleccionadas.filter((id) => id !== categoriaId));
        } else {
          // Si la categoría no está seleccionada, agregarla a la lista
          setCategoriasSeleccionadas([...categoriasSeleccionadas, categoriaId]);
        }
      };

    if(fetching){
        return(
            <View style={{flex: 1, backgroundColor: Colors.light.pureWhite, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }else if(guardado || actualizado || eliminado){
        return(
          <View style={styles.animationContainer}>
            <LottieView
              loop={false}
              autoPlay
              style={{
                width: '44%',
                maxWidth: 400,
              }}
              source={require('../../../assets/lottie/check.json')}
              onAnimationFinish={onFinishAnimation}
            />
            <Text style={styles.animationTitle}>
                ¡Libro {guardado ? 'guardado' : (actualizado ? 'actualizado' : eliminado ? 'eliminado' : '')} con éxito!
            </Text>
        </View>
        )
      } else {
        return (
          <View style={styles.container}>
              <Header title='Libro'/>
              <KeyboardAwareScrollView style={styles.formContainer} contentContainerStyle={{gap: 22}} showsVerticalScrollIndicator={false}>
              <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Título:</Text>
                    <TextInput
                            placeholder="Título"
                            value={nuevoLibro.titulo}
                            onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, titulo: text })}
                            style={styles.formTextInput}
                    />
                </View>
                {renderizarImagen()}
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Imagen:</Text>
                    <TextInput
                        placeholder="Imagen"
                        value={nuevoLibro.imagen}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, imagen: text })}
                        style={styles.formTextInput}
                    />
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Sinopsis:</Text>
                    <TextInput
                        placeholder="Sinopsis"
                        value={nuevoLibro.sinopsis}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, sinopsis: text })}
                        style={[styles.formTextInput, {height: 140}]}
                        multiline
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Año de Publicación:</Text>
                    <TextInput
                        placeholder="Año de Publicación"
                        keyboardType='numeric'
                        value={nuevoLibro.añoPublicacion.toString()}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, añoPublicacion: text})}
                        style={styles.formTextInput}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>ISBN:</Text>
                    <TextInput
                        placeholder="ISBN"
                        value={nuevoLibro.isbn?.toString()}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, isbn: text })}
                        style={styles.formTextInput}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Número de Copias Totales:</Text>
                    <TextInput
                        placeholder="Número de Copias Totales"
                        keyboardType='numeric'
                        value={nuevoLibro.numCopiasTotales.toString()}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, numCopiasTotales: text })}
                        style={styles.formTextInput}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Número de Copias Disponibles:</Text>
                    <TextInput
                        placeholder="Número de Copias Disponibles"
                        keyboardType='numeric'
                        value={nuevoLibro.numCopiasDisponibles.toString()}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, numCopiasDisponibles: text })}
                        style={styles.formTextInput}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Número de Estante:</Text>
                    <TextInput
                        placeholder="Número de Estante"
                        keyboardType='numeric'
                        value={nuevoLibro.numEstante.toString()}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, numEstante: text })}
                        style={styles.formTextInput}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Número de Repisa:</Text>
                    <TextInput
                        placeholder="Número de Repisa"
                        keyboardType='numeric'
                        value={nuevoLibro.numRepisa.toString()}
                        onChangeText={(text) => setNuevoLibro({ ...nuevoLibro, numRepisa: text })}
                        style={styles.formTextInput}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Autores:</Text>
                    {autores.map((autor) => (
                        <TouchableOpacity
                        key={autor.idAutor}
                        style={[styles.checkboxContainer, autoresSeleccionados.includes(autor.idAutor) && styles.checkedCheckboxContainer]}
                        onPress={() => toggleAutor(autor.idAutor)}
                        >
                        <Text>{autor.nombreAutor}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formItemTitle}>Categorías:</Text>
                    {categorias.map((categoria) => (
                        <TouchableOpacity
                        key={categoria.idCategoria}
                        style={[styles.checkboxContainer, categoriasSeleccionadas.includes(categoria.idCategoria) && styles.checkedCheckboxContainer]}
                        onPress={() => toggleCategoria(categoria.idCategoria)}
                        >
                        <Text>{categoria.nombreCategoria}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
              </KeyboardAwareScrollView>


              
                {/* BottomTab */}
                <View style={{ flex: 1}}>
                <View style={styles.containerBtn}>
                    {
                        modoActualizarEliminar && (
                            <View style={styles.dateContainer}>
                                <FontAwesome name="trash" size={24} color={Colors.light.primary} />
                                <Text style={styles.date} onPress={confirmarEliminar}>
                                    Eliminar
                                </Text>
                            </View>
                        )
                    }
                    <TouchableOpacity style={styles.prestarBtn}  disabled={loading} 
                        onPress={handleGuardarLibro}
                    >
                        <Text style={styles.prestarText}>
                            { loading ? modoActualizarEliminar ? 'Actualizando...' : 'Guardando...' :  modoActualizarEliminar ? 'Actualizar' : 'Guardar' }
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
          </View>
        )
    }

}

export default Book;

const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.pureWhite,
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 17,
      },
      animationTitle: {
        color: Colors.light.secondary,
        fontFamily: 'InterBold',
        fontSize: 22
      }, 
    formContainer: {
        paddingHorizontal: 40,
        gap: 22,
        marginBottom: 120
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      checkedCheckboxContainer: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
    imagen: {
        height: 280,
        width: 200,
        borderRadius: 15,
        elevation: 25,
        alignSelf: 'center'
    },
    formItem: {
        gap: 8
    },
    formTextInput: {
        backgroundColor: Colors.light.clearGray,
        padding: 14,
        borderRadius: 11
    }, 
    formItemTitle:{
        color: Colors.light.primary,
        marginLeft: 4,
        fontWeight:'600'
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