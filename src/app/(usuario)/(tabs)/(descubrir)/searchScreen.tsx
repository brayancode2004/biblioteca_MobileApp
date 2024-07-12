import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import { router } from 'expo-router';
import { buscarLibros } from '../../../../services/LibrosService';
import { renderStarRating } from '../../../../utils/Functions';
import { book } from '../../../../types';
import { ScrollView } from 'react-native-gesture-handler';
import 'react-native-reanimated';


function SearchScreen() {
  const [books, setBooks] = useState<book[]>([]);
    const [query, setQuery] = useState<string>('');
    let timeoutId: NodeJS.Timeout | null = null;
    const [searching, setSearching] = useState<boolean>(false);
    const [showNoResultsMessage, setShowNoResultsMessage] = useState<boolean>(false);

    // Función de debounce para retrasar la ejecución de la búsqueda
    const debounce = (func: (...args: any[]) => void, delay: number): (() => void) => {
      return function(this: any, ...args: any[]): void {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
  };
  

    useEffect(() => {
        // Función de búsqueda con debounce
        const buscandoLibrosDebounced = debounce(async () => {
            try {
                if (query.length > 0) {
                    setSearching(true);
                    const response = await buscarLibros(query);
                    setBooks(response.data);
                    setSearching(false); // Finaliza la búsqueda
                    setShowNoResultsMessage(response.data.length === 0); // Muestra el mensaje de "No se encontraron resultados" si no hay resultados
                } else {
                    setSearching(false);
                    setBooks([]); // Limpiar la lista de libros si la búsqueda está vacía
                    setShowNoResultsMessage(false);
                }
            } catch (error) {
                setSearching(false);
                setShowNoResultsMessage(false);
            }
        }, 500); // Esperar 600 milisegundos antes de realizar la búsqueda

        // Llamar a la función buscandoLibrosDebounced cada vez que query cambie
        buscandoLibrosDebounced();

        // Limpiar el timeout en caso de que el componente se desmonte o query cambie nuevamente
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [query]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name='arrow-back-outline' size={24} />
                    </TouchableOpacity>
                    <View style={styles.headerTitle}>
                        <Text style={styles.titleText}>Busca y Descubre</Text>
                    </View>
                    <View>
                        <Ionicons name='arrow-back-outline' size={24} color='transparent' />
                    </View>
                </View>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        placeholder="Buscar un libro"
                        placeholderTextColor={'gray'}
                        style={styles.searchBarInput}
                        value={query}
                        onChangeText={setQuery}
                    />
                    <Pressable style={styles.iconContainer} onPress={() => Keyboard.dismiss()}>
                        <Ionicons name="search-outline" size={22} color={Colors.light.primary} />
                    </Pressable>
                </View>
                <ScrollView style={styles.resultadosContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 11}} >
                    {searching ? (
                        <ActivityIndicator/>
                    ) : showNoResultsMessage ? (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 14}}>
                          <Text style={styles.errorTitle}>Oups!</Text>
                          <Image source={require('../../../../../assets/error.svg')} style={styles.errorImagen}/>
                          <Text style={styles.errorSubtitle}>No se encontraron resultados para:</Text>
                          <Text 
                            style={{ color: Colors.light.primary, fontFamily: 'InterBold', fontSize: 22}}
                          >
                            "{query}"
                          </Text>
                        </View>
                    ) : (
                        <View>
                            {query.length === 0 ? (
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 22, paddingHorizontal: 22}}>
                                <Image source={require('../../../../../assets/search.svg')} 
                                  style={{width: 240, height: 240 }} 
                                />
                                <Text 
                                  style={{ color: Colors.light.primary, fontFamily: 'InterSemi', fontSize: 18, textAlign:'center'}}
                                >
                                  Busca libros por título o autor
                                </Text>
                              </View>
                            ) : (
                                <Text 
                                  style={{ color: Colors.light.primary, fontFamily: 'InterSemi', fontSize: 18}}
                                >
                                  Resultados:
                                </Text>
                            )}
                            {books && books.length > 0 ? (
                                books.map((book: book, index: number) => (
                                    <Pressable key={book.idLibro} style={styles.bookItemContainer} onPress={() => router.push({ params: { idLibro: book.idLibro }, pathname: '(bookDetails)/id' })}>
                                        <Image source={{ uri: book.imagen }} style={styles.bookImagen} contentFit='fill' />
                                        <View style={styles.bookInfoSection}>
                                            <Text style={styles.bookTitle}>{book.titulo}</Text>
                                            <Text style={styles.bookAutors}>{book.autores[0].nombreAutor}</Text>
                                            <View style={styles.stars}>
                                                {renderStarRating(book.calificacionPromedio, 20)}
                                            </View>
                                        </View>
                                    </Pressable>
                                ))
                            ) : null}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 11,
        backgroundColor: Colors.light.pureWhite,
        gap: 17,
    },
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
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: Colors.light.clearGray,
        padding: 6,
    },
    searchBarInput: {
        flex: 1,
        marginBottom: 1,
        paddingLeft: 12,
        fontSize: 16,
        letterSpacing: 0.5,
    },
    iconContainer: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 999,
    },
    resultadosContainer: {
        flex: 1,
        marginBottom: 60,
        paddingHorizontal: 11,
        borderTopWidth: 1,
        borderTopColor: '#E2E4E7',
    },
    bookItemContainer: {
        flexDirection: 'row',
        paddingVertical: 11,
        gap: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E4E7',
    },
    bookImagen: {
        width: 120,
        height: 170,
        borderRadius: 11,
    },
    bookInfoSection: {
        justifyContent: 'center',
        gap: 11,
        flexWrap: 'wrap',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: '600',
        maxWidth: '80%',
        overflow: 'hidden',
    },
    bookAutors: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '600',
    },
    stars: {
        flexDirection: 'row',
        gap: 2,
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
});