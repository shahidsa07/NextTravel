
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a destination..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={() => onSearch(query)}>
        <Ionicons name="search" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginRight: SIZES.base,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding / 1.5,
    borderRadius: SIZES.radius,
  },
});

export default Search;
