import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FilterModal from '../../components/FilterModal';
import { useTheme } from '../../constants/theme';

interface AppliedFilters {
  vehicleType?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  seats?: string[];
  amenities?: string[];
  rating?: string[];
  availability?: boolean;
}

interface VehicleItem {
  id: string;
  name: string;
  image: string;
  seats: number;
  amenities: string[];
  price: number;
  rating: number;
  badge: string;
}

const mockVehicles: VehicleItem[] = [
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
  const { to, from, tripDate } = useLocalSearchParams();
  
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleItem[]>(mockVehicles);

  const handleFilterApply = (filters: AppliedFilters) => {
    setAppliedFilters(filters);
    // Apply filters to the vehicle list
    console.log('Applied filters:', filters);
    setFilteredVehicles(mockVehicles);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (appliedFilters.vehicleType && appliedFilters.vehicleType.length > 0) {
      count += appliedFilters.vehicleType.length;
    }
    if (appliedFilters.seats && appliedFilters.seats.length > 0) {
      count += appliedFilters.seats.length;
    }
    if (appliedFilters.amenities && appliedFilters.amenities.length > 0) {
      count += appliedFilters.amenities.length;
    }
    if (appliedFilters.rating && appliedFilters.rating.length > 0) {
      count += appliedFilters.rating.length;
    }
    if (appliedFilters.availability) {
      count += 1;
    }
    return count;
  };

  const renderVehicleItem = ({ item }: { item: VehicleItem }) => (
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
          <TouchableOpacity style={styles.detailsButton} onPress={() => router.push({ pathname: '/search/bus-details', params: { id: item.id } })}>
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
            <MaterialIcons name="map" size={26} color={COLORS.gray} />
            <View style={{marginLeft: SIZES.base}}>
                <Text style={styles.routeText}>{from} → {to}</Text>
                <Text style={styles.tripDateText}>{tripDate}</Text>
            </View>
        </View>
        <TouchableOpacity 
          style={styles.filterIconButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter" size={16} color={COLORS.black} />
          {getActiveFilterCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterButton, styles.activeFilter]}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={[styles.filterButtonText, { color: COLORS.white }]}>
              FILTERS {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Text>
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
        <Text style={styles.optionsAvailable}>{filteredVehicles.length} PREMIUM OPTIONS AVAILABLE</Text>
      </View>

      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleFilterApply}
        appliedFilters={appliedFilters}
      />
    </View>
  );
};

const getStyles = (COLORS: any, FONTS: any, SIZES: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    paddingTop: 50,
    backgroundColor: COLORS.white,
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    paddingBottom: SIZES.base
  },
  summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.base,
    paddingLeft: 0
  },
  routeText: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  tripDateText: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  filterIconButton: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  filterBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  filtersContainer: {
    paddingVertical: SIZES.base,
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.lightWhite,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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