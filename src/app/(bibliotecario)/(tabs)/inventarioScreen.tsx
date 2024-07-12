import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../../../constants/Colors"
import { useEffect, useState } from "react";
import TopTabMenu from "../../../components/Inventario/TopTabMenu";
import SearchHeader from "../../../components/CommonComponents/SearchHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import 'react-native-reanimated';


function InventarioScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader tipo="inventario"/>
      <TopTabMenu/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.pureWhite
  },
})

export default InventarioScreen
