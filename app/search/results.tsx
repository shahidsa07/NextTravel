import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterModal from '../../components/FilterModal';
import { useTheme } from '../../constants/theme';

interface AppliedFilters {
  vehicleType?: string[];
  capacity?: string;
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
  const insets = useSafeAreaInsets();
  
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleItem[]>(mockVehicles);

  // Quick filter options that sync with FilterModal
  const [quickFilters, setQuickFilters] = useState({
    wifi: false,
    ac: false,
    luxury: false,
    highCapacity: false, // 40+ seats
    bestRated: false, // 4.5+ rating
  });

  // Animated status bar overlay opacity
  const statusBarOverlayOpacity = useSharedValue(0);

  // Animate status bar overlay with modal transitions
  useEffect(() => {
    if (filterModalVisible) {
      statusBarOverlayOpacity.value = withTiming(1, { duration: 500 });
    } else {
      statusBarOverlayOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [filterModalVisible]);

  // Animated style for status bar overlay
  const statusBarOverlayStyle = useAnimatedStyle(() => ({
    opacity: statusBarOverlayOpacity.value,
  }));

  // Toggle quick filters and sync with FilterModal
  const toggleQuickFilter = (filterType: keyof typeof quickFilters) => {
    setQuickFilters(prev => {
      const newFilters = { ...prev, [filterType]: !prev[filterType] };
      
      // Sync with appliedFilters for FilterModal
      const updatedAppliedFilters = { ...appliedFilters };
      
      if (filterType === 'wifi') {
        const amenities = updatedAppliedFilters.amenities || [];
        if (newFilters.wifi) {
          if (!amenities.includes('wifi')) amenities.push('wifi');
        } else {
          const index = amenities.indexOf('wifi');
          if (index > -1) amenities.splice(index, 1);
        }
        updatedAppliedFilters.amenities = amenities;
      }
      
      if (filterType === 'ac') {
        const amenities = updatedAppliedFilters.amenities || [];
        if (newFilters.ac) {
          if (!amenities.includes('ac')) amenities.push('ac');
        } else {
          const index = amenities.indexOf('ac');
          if (index > -1) amenities.splice(index, 1);
        }
        updatedAppliedFilters.amenities = amenities;
      }
      
      if (filterType === 'luxury') {
        const vehicleTypes = updatedAppliedFilters.vehicleType || [];
        if (newFilters.luxury) {
          if (!vehicleTypes.includes('luxury')) vehicleTypes.push('luxury');
        } else {
          const index = vehicleTypes.indexOf('luxury');
          if (index > -1) vehicleTypes.splice(index, 1);
        }
        updatedAppliedFilters.vehicleType = vehicleTypes;
      }
      
      if (filterType === 'highCapacity') {
        updatedAppliedFilters.capacity = newFilters.highCapacity ? '50+' : '';
      }
      
      setAppliedFilters(updatedAppliedFilters);
      return newFilters;
    });
  };

  // Sync quick filters with applied filters when modal closes
  useEffect(() => {
    if (!filterModalVisible) {
      setQuickFilters({
        wifi: appliedFilters.amenities?.includes('wifi') || false,
        ac: appliedFilters.amenities?.includes('ac') || false,
        luxury: appliedFilters.vehicleType?.includes('luxury') || false,
        highCapacity: appliedFilters.capacity === '50+' || false,
        bestRated: false, // This could be based on a future rating filter
      });
    }
  }, [filterModalVisible, appliedFilters]);

  const handleFilterApply = (filters: AppliedFilters) => {
    setAppliedFilters(filters);
    // Apply filters to the vehicle list
    console.log('Applied filters:', filters);
    setFilteredVehicles(mockVehicles);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    
    // Count vehicle types
    if (appliedFilters.vehicleType && appliedFilters.vehicleType.length > 0) {
      count += appliedFilters.vehicleType.length;
    }
    
    // Count capacity (only if not empty string)
    if (appliedFilters.capacity && appliedFilters.capacity.trim() !== '') {
      count += 1;
    }
    
    // Count price range (only if different from default)
    if (appliedFilters.priceRange && 
        (appliedFilters.priceRange.min !== 100 || appliedFilters.priceRange.max !== 1000)) {
      count += 1;
    }
    
    // Count amenities
    if (appliedFilters.amenities && appliedFilters.amenities.length > 0) {
      count += appliedFilters.amenities.length;
    }
    
    // Don't count seats or rating as they're not implemented yet
    // Remove these unused filter counts:
    // - seats is not used in the current filter system
    // - rating is not implemented yet
    // - availability is not implemented yet
    
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
      <StatusBar style={filterModalVisible ? "light" : "dark"} />
      {filterModalVisible && (
        <Animated.View style={[{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999
        }, statusBarOverlayStyle]} />
      )}
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
        <ScrollView style={styles.filterScrollContainer} horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterButton, quickFilters.wifi && styles.activeFilter]}
            onPress={() => toggleQuickFilter('wifi')}
          >
            <Ionicons 
              name="wifi" 
              size={14} 
              color={quickFilters.wifi ? COLORS.black : COLORS.gray} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.filterButtonText, quickFilters.wifi && { color: COLORS.black }]}>WiFi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, quickFilters.ac && styles.activeFilter]}
            onPress={() => toggleQuickFilter('ac')}
          >
            <Ionicons 
              name="snow" 
              size={14} 
              color={quickFilters.ac ? COLORS.black : COLORS.gray} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.filterButtonText, quickFilters.ac && { color: COLORS.black }]}>AC</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, quickFilters.luxury && styles.activeFilter]}
            onPress={() => toggleQuickFilter('luxury')}
          >
            <Ionicons 
              name="diamond" 
              size={14} 
              color={quickFilters.luxury ? COLORS.black : COLORS.gray} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.filterButtonText, quickFilters.luxury && { color: COLORS.black }]}>Luxury</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, quickFilters.highCapacity && styles.activeFilter]}
            onPress={() => toggleQuickFilter('highCapacity')}
          >
            <Ionicons 
              name="people" 
              size={14} 
              color={quickFilters.highCapacity ? COLORS.black : COLORS.gray} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.filterButtonText, quickFilters.highCapacity && { color: COLORS.black }]}>50+ Seats</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, quickFilters.bestRated && styles.activeFilter]}
            onPress={() => toggleQuickFilter('bestRated')}
          >
            <Ionicons 
              name="star" 
              size={14} 
              color={quickFilters.bestRated ? COLORS.black : COLORS.gray} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.filterButtonText, quickFilters.bestRated && { color: COLORS.black }]}>Top Rated</Text>
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
    borderWidth: 1,
    borderColor: COLORS.gray2 || '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 2,
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
  filterScrollContainer: {
    paddingHorizontal: SIZES.base * 2,
  }
});

export default SearchResultsScreen;