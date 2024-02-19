import React, { useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

function SearchBar({ query, setQuery}) {
  return (
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Buscar un libro"
          placeholderTextColor={'gray'}
          style={styles.searchBarInput}
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.iconContainer}>
          <Ionicons name="search-outline" size={22} color={Colors.light.primary} />
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
    borderRadius: 28,
    backgroundColor: Colors.light.clearGray,
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