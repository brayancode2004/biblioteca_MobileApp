import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

function FavoritosScreen() {
  return (
    <SafeAreaView>
        <Text style={styles.title}>Libros Favoritos</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  }
})

export default FavoritosScreen
