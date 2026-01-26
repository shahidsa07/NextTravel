
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const mockBusDetails = {
  '1': {
    name: 'Rajesh Transports',
    type: 'Volvo Multi-Axle A/C Sleeper (2+1)',
    departureTime: '23:30',
    arrivalTime: '06:00',
    duration: '6h 30m',
    seats: 17,
    singleSeats: 5,
    price: 1180,
    rating: 3.9,
    reviews: 196,
    tags: ['Flexi Ticket', 'Clean Bus'],
    amenities: ['Live Tracking', 'Policies', 'Photos', 'Amenities', 'Boarding & Dropping Points'],
  },
  '2': {
    name: 'Rajeswari Travels',
    type: 'NON A/C Sleeper (2+1)',
    departureTime: '23:30',
    arrivalTime: '06:30',
    duration: '7h',
    seats: 20,
    singleSeats: 6,
    price: 600,
    rating: 3.7,
    reviews: 305,
    tags: ['Flexi Ticket', 'Extra Legroom'],
    amenities: ['Live Tracking', 'Policies', 'Photos', 'Amenities', 'Boarding & Dropping Points'],
  },
  '3': {
    name: 'Rajeswari Travels',
    type: 'A/C Sleeper (2+1)',
    departureTime: '22:30',
    arrivalTime: '05:00',
    duration: '6h 30m',
    seats: 13,
    singleSeats: 4,
    price: 800,
    rating: 3.8,
    reviews: 119,
    tags: ['Flexi Ticket', 'Clean Bus'],
    amenities: ['Live Tracking', 'Policies', 'Photos', 'Amenities', 'Boarding & Dropping Points'],
  },
};

const BusDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const bus = mockBusDetails[id];

  if (!bus) {
    return <Text>Bus not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{bus.name}</Text>
          <Text style={styles.headerSubtitle}>{bus.type}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Bus Details</Text>
        <Text>Departure: {bus.departureTime}</Text>
        <Text>Arrival: {bus.arrivalTime}</Text>
        <Text>Duration: {bus.duration}</Text>
        <Text>Price: ₹{bus.price}</Text>
        <Text>Rating: {bus.rating} ({bus.reviews} reviews)</Text>
      </View>

      <View style={styles.amenitiesContainer}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        {bus.amenities.map(amenity => (
          <Text key={amenity} style={styles.amenityItem}>{amenity}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.padding,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    paddingTop: 60,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  headerSubtitle: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  detailsContainer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    margin: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  amenitiesContainer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    margin: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  sectionTitle: {
    ...FONTS.h4,
    marginBottom: SIZES.base,
  },
  amenityItem: {
    ...FONTS.body4,
    marginBottom: SIZES.base / 2,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    margin: SIZES.padding,
  },
  bookButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default BusDetailsScreen;
