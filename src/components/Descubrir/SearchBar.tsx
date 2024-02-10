import React, { useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function SearchBar() {
  return (
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Buscar un libro"
          placeholderTextColor={'gray'}
          style={styles.searchBarInput}
        />
        <View style={styles.iconContainer}>
          <Ionicons name="search-outline" size={22} />
        </View>
      </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 6,
  },
  searchBarInput: {
    flex: 1,
    marginBottom: 1,
    paddingLeft: 12,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 999,
  },
});