import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import Colors from "../../../constants/Colors"
import { useEffect, useState } from "react";
import TopTabMenu from "../../../components/Inventario/TopTabMenu";
import SearchHeader from "../../../components/CommonComponents/SearchHeader";

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
