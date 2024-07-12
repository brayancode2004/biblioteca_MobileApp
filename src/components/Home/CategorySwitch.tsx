import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import 'react-native-reanimated';


interface CustomSwitchProps {
  isAcademic: boolean;
  setIsAcademic: (value: boolean) => void;
}

const CategorySwitch: React.FC<CustomSwitchProps> = ({ isAcademic, setIsAcademic }) => {
  const togglSwitch = () => {
    setIsAcademic(!isAcademic)
  }

  return (
    <View style={styles.container}>
      <View style={styles.toggleBar}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: 35,
            backgroundColor: isAcademic === true ? '#f98806' : '#ddd',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={togglSwitch}
        >
          <Text style={{ color: isAcademic === true ? 'white' : '#f98806', fontWeight: '800' }}>Literatura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: 35,
            backgroundColor: isAcademic === false ? '#f98806' : '#ddd',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={togglSwitch}
        >
          <Text style={{ color: isAcademic === false ? 'white' : '#f98806', fontWeight: '800' }}>Académico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toggleBar: {
    width: '100%',
    height: 42,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#ddd',
  },
});

export default CategorySwitch;


