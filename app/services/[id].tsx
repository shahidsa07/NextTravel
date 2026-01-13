
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ServiceDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // In a real app, you'd fetch this data based on the ID
  const service = {
    id,
    name: `Service #${id}`,
    description: 'This is a detailed description of the service. It includes information about the vehicle, the route, and other amenities provided.',
    price: '$100',
  };

  const handleBooking = () => {
    // Here you would navigate to a booking confirmation screen
    Alert.alert('Booking Successful', `You have booked ${service.name}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.price}>Price: {service.price}</Text>
      <Button title="Book Now" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ServiceDetailScreen;
