
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const mockBuses = [
  {
    id: '1',
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
  },
  {
    id: '2',
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
  },
  {
    id: '3',
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
  },
];

const SearchResultsScreen = () => {
  const router = useRouter();
  const { from, to } = useLocalSearchParams();

  const renderBusItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: 'search/bus-details', params: { id: item.id } })}>
      <View style={styles.busInfoTop}>
        <View>
          {/* <Text style={styles.busTime}>{`${item.departureTime} - ${item.arrivalTime}`}</Text> */}
          <Text style={styles.busDuration}>{`${item.seats} Seats`}</Text>
        </View>
        <Text style={styles.busPrice}>From ₹{item.price}</Text>
      </View>
      <View style={styles.busInfoBottom}>
        <View>
          <Text style={styles.busName}>{item.name}</Text>
          <Text style={styles.busType}>{item.type}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.white} />
          <Text style={styles.ratingText}>{`${item.rating} • ${item.reviews}`}</Text>
        </View>
      </View>
      <View style={styles.tagsContainer}>
        {item.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{`${from} to ${to}`}</Text>
          <Text style={styles.headerSubtitle}>129 Buses</Text>
        </View>
        {/* <TouchableOpacity style={styles.dateContainer}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          <Text style={styles.dateText}>25 Jun</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
        </TouchableOpacity> */}
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>FREE DATE CHANGE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={[styles.filterButtonText, { color: COLORS.white }]}>LAST MINUTE DEAL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>RETURN OFFER</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={mockBuses}
        renderItem={renderBusItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="bus-outline" size={24} color={COLORS.primary} />
          <Text style={styles.footerButtonText}>Primo Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="bed-outline" size={24} color={COLORS.primary} />
          <Text style={styles.footerButtonText}>Sleeper</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="snow-outline" size={24} color={COLORS.primary} />
          <Text style={styles.footerButtonText}>A/C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>NON A/C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="accessibility-outline" size={24} color={COLORS.primary} />
          <Text style={styles.footerButtonText}>Seater</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortFilterButton}>
          <Text style={styles.sortFilterButtonText}>SORT & FILTER</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: SIZES.padding,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    paddingTop: 60
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  headerSubtitle: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...FONTS.h4,
    color: COLORS.white,
    marginHorizontal: SIZES.base,
  },
  filtersContainer: {
    paddingVertical: SIZES.base,
    paddingLeft: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  filterButton: {
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: SIZES.base,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    ...FONTS.body4,
  },
  listContainer: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  busInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  busTime: {
    ...FONTS.h3,
  },
  busDuration: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  busPrice: {
    ...FONTS.h3,
  },
  busInfoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  busName: {
    ...FONTS.h4,
  },
  busType: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E8449',
    borderRadius: SIZES.radius,
    padding: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
  },
  ratingText: {
    ...FONTS.body4,
    color: COLORS.white,
    marginLeft: SIZES.base / 2,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
    marginRight: SIZES.base,
  },
  tagText: {
    ...FONTS.body5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    ...FONTS.body5,
    marginTop: SIZES.base / 2,
  },
  sortFilterButton: {
    backgroundColor: '#D32F2F',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  sortFilterButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});

export default SearchResultsScreen;
