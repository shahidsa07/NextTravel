
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS, SIZES } from '../../constants/theme';

const MOCK_RESULTS = [
  { id: '3', name: 'Mountain Cabin', price: '$200' },
  { id: '4', name: 'City Apartment', price: '$120' },
];

const SearchResultsScreen = () => {
  const { query } = useLocalSearchParams();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results for "{query}"</Text>
      <FlatList
        data={MOCK_RESULTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  title: {
    ...SIZES.h3,
    marginBottom: SIZES.padding,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  itemName: {
    ...SIZES.h4,
  },
  itemPrice: {
    ...SIZES.body4,
    color: COLORS.primary,
  },
});

export default SearchResultsScreen;
