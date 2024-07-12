import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import authors from '../../utils/Data';
import { acortarTexto } from '../../utils/Functions';
import { Image } from 'expo-image';
import 'react-native-reanimated';


interface CarouselItem {
    id: number;
    picture: string;
    name: string;
}

function TopAutores({ discover } : { discover : boolean }) {
  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => (
    <View style={styles.authorItem}>
        <Image source={{ uri: item.picture }} style={styles.authorImage} />
        <Text style={styles.authorName}>{acortarTexto(item.name,10) }</Text>
    </View>
    );

  return (
    <View style={[styles.container, discover && {paddingHorizontal: 11, marginTop: 11}]}> 
        <View style={styles.titleContainer}>
            <Text style={discover ? styles.discoverScreenTitle : styles.title}>Top 10 Autores</Text>
            <Text style={styles.seeAll}>Ver más...</Text>
        </View>
        <FlatList
            data={authors}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
        />
    </View>
    )
}

export default TopAutores

const styles = StyleSheet.create({
    container: {
        gap: 14,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 19,
        fontWeight: '600'
    },
    discoverScreenTitle: {
        fontSize: 22,
        fontFamily: 'InterSemi',
    },
    seeAll: {
        color: '#FD3510',
        fontWeight: '500'
    },
    flatList: {
        gap: 22
    },
    authorItem: {
        alignItems: 'center',
        gap: 4,
    },
    authorImage: {
        width: 74,
        height: 74,
        borderRadius: 37,
        marginRight: 10,
    },
    authorName: {
        fontSize: 16,
    },
})