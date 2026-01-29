
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../constants/theme';

const mockVehicles = [
  {
    id: '1',
    name: 'Executive Coach Series 5',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    seats: 45,
    amenities: ['Climate Control', 'Free WiFi'],
    price: 520,
    rating: 4.9,
    badge: 'Top Choice',
  },
  {
    id: '2',
    name: 'Luxury Minibus',
    image: 'https://images.unsplash.com/photo-1620292415136-44a2b94c3a5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    seats: 25,
    amenities: ['Climate Control', 'Leather Seats'],
    price: 480,
    rating: 4.8,
    badge: 'Best Value',
  },
];

const SearchResultsScreen = () => {
  const router = useRouter();
  const { COLORS, FONTS, SIZES } = useTheme();
  const styles = getStyles(COLORS, FONTS, SIZES);
  const { to, departureDate } = useLocalSearchParams();

  const renderVehicleItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      {item.badge && (
        <View style={[styles.badge, item.badge === 'Top Choice' ? styles.topChoiceBadge : styles.bestValueBadge]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.favoriteIcon}>
        <Ionicons name="heart-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.vehicleName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={'#FFC700'} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.amenitiesContainer}>
          <View style={styles.amenity}>
            <Ionicons name="people-outline" size={18} color={COLORS.gray} />
            <Text style={styles.amenityText}>{item.seats} Seats</Text>
          </View>
          <View style={styles.amenity}>
            <Ionicons name="snow-outline" size={18} color={COLORS.gray} />
            <Text style={styles.amenityText}>{item.amenities[0]}</Text>
          </View>
          <View style={styles.amenity}>
            <Ionicons name="wifi-outline" size={18} color={COLORS.gray} />
            <Text style={styles.amenityText}>{item.amenities[1]}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
            <View>
                <Text style={styles.priceLabel}>TOTAL DAILY RATE</Text>
                <Text style={styles.price}>${item.price} <Text style={styles.pricePerDay}>/ day</Text></Text>
            </View>
          <TouchableOpacity style={styles.detailsButton} onPress={() => router.push({ pathname: 'search/bus-details', params: { id: item.id } })}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <View style={styles.summaryContainer}>
            <MaterialIcons name="article" size={24} color={COLORS.gray} />
            <View style={{marginLeft: SIZES.base}}>
                <Text style={styles.summaryLabel}>SEARCH SUMMARY</Text>
                <Text style={styles.summaryText}>{to} • {departureDate}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.filterIconButton}>
          <Ionicons name="filter" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={[styles.filterButtonText, { color: COLORS.white }]}>FILTERS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>LUXURY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>EXECUTIVE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>40+ SEATS</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={{paddingHorizontal: SIZES.padding}}>
        <Text style={styles.selectVehicle}>Select Vehicle</Text>
        <Text style={styles.optionsAvailable}>12 PREMIUM OPTIONS AVAILABLE</Text>
      </View>

      <FlatList
        data={mockVehicles}
        renderItem={renderVehicleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    paddingTop: 50,
    backgroundColor: COLORS.lightWhite
  },
  summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.base,
    marginLeft: SIZES.padding
  },
  summaryLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  summaryText: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  filterIconButton: {
      backgroundColor: COLORS.white,
      padding: SIZES.base,
      borderRadius: SIZES.radius,
      borderWidth: 1,
      borderColor: COLORS.gray2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  filtersContainer: {
    paddingVertical: SIZES.base,
    paddingLeft: SIZES.padding,
    backgroundColor: COLORS.lightWhite,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: SIZES.base,
  },
  activeFilter: {
    backgroundColor: COLORS.black,
  },
  filterButtonText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  selectVehicle: {
    ...FONTS.h2,
    color: COLORS.black
  },
  optionsAvailable: {
      ...FONTS.body4,
      color: COLORS.gray
  },
  listContainer: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
  },
  badge: {
    position: 'absolute',
    top: SIZES.base,
    left: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 5,
    borderRadius: 5,
  },
  topChoiceBadge: {
    backgroundColor: '#00A799',
  },
  bestValueBadge: {
    backgroundColor: COLORS.black
  },
  badgeText: {
    ...FONTS.body5,
    color: COLORS.white,
  },
  favoriteIcon: {
    position: 'absolute',
    top: SIZES.base,
    right: SIZES.base,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: SIZES.base / 2,
    borderRadius: 20
  },
  cardContent: {
    padding: SIZES.padding,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleName: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.base / 2,
    borderRadius: SIZES.radius
  },
  ratingText: {
    ...FONTS.body4,
    color: COLORS.black,
    marginLeft: 5,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.padding,
  },
  amenity: {
    alignItems: 'center',
  },
  amenityText: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  priceLabel: {
    ...FONTS.body5,
    color: COLORS.gray
  },
  price: {
    ...FONTS.h2,
    color: COLORS.black
  },
  pricePerDay: {
      ...FONTS.body4,
      color: COLORS.gray
  },
  detailsButton: {
    backgroundColor: '#00A799',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  detailsButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});

export default SearchResultsScreen;
