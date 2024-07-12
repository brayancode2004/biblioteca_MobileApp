import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { book, favorito } from '../../types';
import { AntDesign} from '@expo/vector-icons'
import { renderStarRating } from '../../utils/Functions';
import Colors from '../../constants/Colors';
import { quitarFavorito } from '../../services/EstudianteService';
import { router } from 'expo-router';
import 'react-native-reanimated';


function FavoritosItem({ favorito, onUpdateFavoritos }: { favorito: favorito, onUpdateFavoritos: (idLibro: number) => void }) {
  const [favorite, setFavorite] = useState(true);

  const handleRemoveFromFavorites = async () => {
    try {
      setFavorite(false);
      await quitarFavorito(favorito.estudiante.cif, favorito.libro.idLibro); // Llama a la función quitarFavorito
      onUpdateFavoritos(favorito.libro.idLibro); // Actualiza la lista de favoritos después de quitar el libro
    } catch (error: any) {
      setFavorite(true)
      Alert.alert('Error al quitar de favoritos:', error.message);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => router.push({ params: { idLibro: favorito.libro.idLibro }, pathname: '(bookDetails)/id' })}>
    <Image
      source={{ uri: favorito.libro.imagen}}
      style={styles.image}
      contentFit='fill'
    />
    <View style={{ flex: 1, justifyContent: 'center', gap: 17 }}>
      <View>
        <Text style={styles.title}>{favorito.libro.titulo}</Text>
        <Text style={styles.autores}>{favorito.libro.autores[0].nombreAutor}</Text>
      </View>
        <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center'}}>
          {renderStarRating(favorito.libro.calificacionPromedio, 22)}
          <Text style={styles.calificacion}>({favorito.libro.calificacionPromedio})</Text>
        </View>
    </View>
    <View style={styles.quantitySelector}>
      <TouchableOpacity 
        style={{backgroundColor: '#ddd', padding: 5, borderRadius: 22}}
        onPress={handleRemoveFromFavorites}
        >
        <AntDesign
            size={22}
            name={favorite ? 'heart' : 'hearto'}
            color={favorite ? 'red' : 'black'}
            style={{ padding: 5 }}
        />
      </TouchableOpacity>
    </View>
  </Pressable>
  )
}

export default FavoritosItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 11,
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1
      },
      image: {
        width: 100,
        height: 150,
        alignSelf: 'center',
        marginRight: 17,
        borderRadius: 11
      },
      title: {
        fontWeight: '700',
        fontSize: 17,
        marginBottom: 5,
      },
      calificacion:{
        color: Colors.light.gray,
        fontWeight: '700',
        fontSize: 17
      },
      quantitySelector: {
        gap: 17,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginVertical: 10,
      },
      autores: {
        fontWeight: 'bold',
        color: Colors.light.gray,
        fontSize: 16
      },
})