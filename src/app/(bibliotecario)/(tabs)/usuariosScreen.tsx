import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

function UsuariosScreen() {
  return (
    <SafeAreaView>
        <Text style={styles.title}>Usuarios Screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  }
})

export default UsuariosScreen
