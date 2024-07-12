import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BooksSection from './BooksSection';
import AuthorsSection from './AuthorsSection';
import 'react-native-reanimated';


function TopTabMenu() {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <View style={styles.container}>
        <View style={styles.menuBar}>
        <View
            style={[
            styles.menuItem,
            selectedTab === 1 && styles.selectedMenuItem,
            ]}
        >
            <Text
            onPress={() => setSelectedTab(1)}
            style={[
                styles.menuTitles,
                selectedTab === 1 && styles.selectedMenuTitle,
            ]}
            >
            Libros
            </Text>
        </View>
        <View
            style={[
            styles.menuItem,
            selectedTab === 2 && styles.selectedMenuItem,
            ]}
        >
            <Text
            onPress={() => setSelectedTab(2)}
            style={[
                styles.menuTitles,
                selectedTab === 2 && styles.selectedMenuTitle,
            ]}
            >
            Autores
            </Text>
        </View>
        </View>
        {selectedTab === 1 && <BooksSection />}
        {selectedTab === 2 && <AuthorsSection />}
    </View>
  )
}

export default TopTabMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 31,
      },
      menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingHorizontal: 12,
      },
      menuItem: {
        flex: 1,
        paddingBottom: 10,
        borderBottomColor: 'transparent',
        borderBottomWidth: 3.8,
      },
      selectedMenuItem: {
        borderBottomColor: '#F9410B',
      },
      menuTitles: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        // color: 'gray',
      },
      selectedMenuTitle: {
        color: '#F9410B',
      },
})