import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const SelectMedType = ({ navigation, route }) => {
  const { options, onOptionSelect } = route.params;

  const handleOptionSelection = (selectedOption) => {
    onOptionSelect(selectedOption);
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleOptionSelection(index)}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SelectMedType;
