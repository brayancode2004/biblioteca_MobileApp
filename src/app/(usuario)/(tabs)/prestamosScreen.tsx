import { View, Text, StyleSheet, SafeAreaView } from "react-native"

function PrestamosScreen() {
  return (
    <SafeAreaView>
        <Text style={styles.title}>Mis Préstamos</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  }
})

export default PrestamosScreen
