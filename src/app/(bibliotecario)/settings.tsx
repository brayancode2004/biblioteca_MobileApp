import { View, Text, StyleSheet } from 'react-native'

function Settings() {
  return (
    <View>
        <Text style={styles.title}>Configuraciones</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  }
})

export default Settings
