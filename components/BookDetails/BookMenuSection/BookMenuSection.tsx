import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AcercaSection from './AcercaSection';
import CalificacionsSection from './CalificacionsSection';
import RelacionadosSections from './RelacionadosSections';
import { book } from '../../../types';

function BookMenuSection({ book }: { book : book}) {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(1);
  },[book.idLibro])

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
            Acerca de
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
            Calificaciones
          </Text>
        </View>
        <View
          style={[
            styles.menuItem,
            selectedTab === 3 && styles.selectedMenuItem,
          ]}
        >
          <Text
            onPress={() => setSelectedTab(3)}
            style={[
              styles.menuTitles,
              selectedTab === 3 && styles.selectedMenuTitle,
            ]}
          >
            Relacionados
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewSections}>
        {selectedTab === 1 && <AcercaSection book={book}/>}
        {selectedTab === 2 && <CalificacionsSection book={book} />}
        {selectedTab === 3 && <RelacionadosSections book={book}/> }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderBottomWidth: 3.2,
  },
  selectedMenuItem: {
    borderBottomColor: '#F9410B',
  },
  menuTitles: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    // color: 'gray',
  },
  selectedMenuTitle: {
    color: '#F9410B',
  },
  scrollViewSections: {
    marginTop: 11,
    paddingHorizontal: 22,
  
  }
});

export default BookMenuSection;
