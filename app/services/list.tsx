
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const MOCK_SERVICES = [
  { id: '1', name: 'City Express', vehicle: 'Bus', price: '$50/day', rating: 4.5 },
  { id: '2', name: 'Mountain Travelers', vehicle: 'Tempo Traveller', price: '$80/day', rating: 4.8 },
  { id: '3', name: 'Coastal Tours', vehicle: 'Mini Bus', price: '$65/day', rating: 4.2 },
];

const ServicesListScreen = () => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => router.push(`/services/${item.id}`)}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>{item.vehicle} - {item.price}</Text>
      <Text>Rating: {item.rating} / 5</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Services</Text>
      <FlatList
        data={MOCK_SERVICES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServicesListScreen;
