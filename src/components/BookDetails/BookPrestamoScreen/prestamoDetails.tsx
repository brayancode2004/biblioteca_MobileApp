import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors';
import { book } from '../../../types';

function PrestamoDetails({ book, fechaDevolucion }: { book : book, fechaDevolucion : string}) {
  return (
    <View style={styles.container}>
        <View style={styles.firstSection}>
            <View style={styles.items}>
                <Text style={styles.itemTitles}>Período de Préstamo:</Text>
                <Text style={styles.itemAnswers}>
                    {book.categorias[0].nombreCategoria === 'Literatura' || book.categorias[1].nombreCategoria === 'Literatura' ? '15 días' : '7 días'} (renovables)
                </Text>
            </View>
            <View style={styles.items}>
                <Text style={styles.itemTitles}>Fecha Devolución:</Text>
                <Text style={styles.itemAnswers}>{fechaDevolucion}</Text>
            </View>
        </View>
        <View style={styles.secondSection}>
            <Text style={styles.secondSectionTitle}>Nota:</Text>
            <Text style={styles.secondSectionParagraph}>
                Puedes renovar el préstamo hasta 2 veces más. También recuerda que de no 
                entregarlo a tiempo vas a ser multado con 1 dólar por cada día sin entregar el libro.
            </Text>
        </View>
    </View>
  )
}

export default PrestamoDetails;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    firstSection: {
        gap: 22,
        padding: 22,
    },
    secondSection: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 22,
        gap: 11
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemTitles: {
        color: Colors.light.gray,
        fontFamily: 'InterSemi',
        fontSize: 15
    },
    itemAnswers: {
        fontWeight: '600',
        color: Colors.light.secondary
    },
    secondSectionTitle: {
        color: Colors.light.primary,
        fontFamily: 'InterSemi',
        fontSize: 18
    },
    secondSectionParagraph: {
        color: Colors.light.gray,
        fontWeight: '600'
    }
})