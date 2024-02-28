import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Image } from 'expo-image';
import { book, favorito } from '../../types';
import { AntDesign} from '@expo/vector-icons'
import { renderStarRating } from '../../utils/Functions';
import Colors from '../../constants/Colors';

function FavoritosItem({favorito} : { favorito : favorito}) {
  return (
    <View style={styles.container}>
    <Image
      source={{ uri: favorito.libro.imagen}}
      style={styles.image}
      contentFit='fill'
    />
    <View style={{ flex: 1, justifyContent: 'center', gap: 17 }}>
      <View style={styles.subtitleContainer}>
        <Text style={styles.title}>{favorito.libro.titulo}</Text>
        <Text style={styles.autores}>{favorito.libro.autores[0].nombreAutor}</Text>
      </View>
        <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center'}}>
          {renderStarRating(favorito.libro.calificacionPromedio, 22)}
          <Text style={styles.calificacion}>({favorito.libro.calificacionPromedio})</Text>
        </View>
    </View>
    <View style={styles.quantitySelector}>
        <AntDesign
            // onPress={() => }
            size={29}
            name="heart"
            color={'red'}
            style={{ padding: 5 }}
        />
    </View>
  </View>
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
      subtitleContainer: {
        gap: 0,
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
      renovartBtn: {
        backgroundColor: Colors.light.primary,
        padding: 8,
        borderRadius: 6
      },
      renovarText: {
        color: Colors.light.pureWhite,
        fontWeight: '700'
      },
})