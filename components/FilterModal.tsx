import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import RangeSlider from './RangeSlider';

interface FilterOption {
  id: string;
  label: string;
  selected: boolean;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  appliedFilters?: any;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  appliedFilters = {},
}) => {
  const { COLORS, FONTS, SIZES } = useTheme();
  const styles = getStyles(COLORS, FONTS, SIZES);

  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);

  // Sort By options - only one can be selected
  const [sortOptions, setSortOptions] = useState<FilterOption[]>([
    { id: 'relevance', label: 'Relevance', selected: true },
    { id: 'price-low-high', label: 'Price - Low to High', selected: false },
    { id: 'price-high-low', label: 'Price - High to Low', selected: false },
    { id: 'best-rated', label: 'Best Rated', selected: false },
  ]);

  // Initialize filter options based on appliedFilters prop
  useEffect(() => {
    if (appliedFilters) {
      // Sync vehicle type options
      setVehicleTypeOptions(prev => prev.map(option => ({
        ...option,
        selected: appliedFilters.vehicleType?.includes(option.id) || false
      })));

      // Sync capacity options
      setCapacityOptions(prev => prev.map(option => ({
        ...option,
        selected: option.id === appliedFilters.capacity || false
      })));

      // Sync amenities options
      setAmenitiesOptions(prev => prev.map(option => ({
        ...option,
        selected: appliedFilters.amenities?.includes(option.id) || false
      })));

      // Sync price range
      if (appliedFilters.priceRange) {
        setPriceRange(appliedFilters.priceRange);
      }

      // Sync sort options
      if (appliedFilters.sortBy) {
        setSortOptions(prev => prev.map(option => ({
          ...option,
          selected: option.id === appliedFilters.sortBy || (option.id === 'relevance' && !appliedFilters.sortBy)
        })));
      }
    }
  }, [appliedFilters, visible]);

  // For now, only Vehicle Type category
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState<FilterOption[]>([
    { id: 'luxury', label: 'Luxury', selected: false },
    { id: 'executive', label: 'Executive', selected: false },
    { id: 'minibus', label: 'Minibus', selected: false },
    { id: 'standard', label: 'Standard', selected: false },
  ]);

  // Capacity options - only one can be selected
  const [capacityOptions, setCapacityOptions] = useState<FilterOption[]>([
    { id: '1-10', label: '1-10', selected: false },
    { id: '11-20', label: '11-20', selected: false },
    { id: '21-50', label: '21-50', selected: false },
    { id: '50+', label: '50+', selected: false },
  ]);

  // Price range state
  const [priceRange, setPriceRange] = useState({
    min: 100,
    max: 1000,
  });

  // Amenities options - multiple can be selected
  const [amenitiesOptions, setAmenitiesOptions] = useState<FilterOption[]>([
    { id: 'wifi', label: 'WiFi', selected: false },
    { id: 'ac', label: 'AC', selected: false },
    { id: 'non-ac', label: 'Non-AC', selected: false },
    { id: 'semi-sleeper', label: 'Semi-Sleeper', selected: false },
    { id: 'seater', label: 'Seater', selected: false },
  ]);

  const modalHeight = '80%';

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0);
      setScrollOffset(0);
    } else {
      // Reset scroll offset when modal closes
      setScrollOffset(0);
    }
  }, [visible, translateY]);

  // Gesture for modal dismissal
  const gesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Allow dismissal if at top of scroll OR if dragging down from any position
      if (scrollOffset <= 5 && event.translationY > 0) {
        translateY.value = Math.max(0, startY.value + event.translationY);
      }
    })
    .onEnd((event) => {
      // Close modal if dragged down significantly from the top
      if (scrollOffset <= 5 && translateY.value > 80) {
        translateY.value = withTiming(500, { duration: 300 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const selectSort = (optionId: string) => {
    const updatedOptions = sortOptions.map(option => ({
      ...option,
      selected: option.id === optionId,
    }));
    setSortOptions(updatedOptions);
  };

  const toggleVehicleType = (optionId: string) => {
    const updatedOptions = vehicleTypeOptions.map(option =>
      option.id === optionId
        ? { ...option, selected: !option.selected }
        : option
    );
    setVehicleTypeOptions(updatedOptions);
  };

  const selectCapacity = (optionId: string) => {
    const updatedOptions = capacityOptions.map(option => ({
      ...option,
      selected: option.id === optionId,
    }));
    setCapacityOptions(updatedOptions);
  };

  const toggleAmenity = (optionId: string) => {
    const updatedOptions = amenitiesOptions.map(option =>
      option.id === optionId
        ? { ...option, selected: !option.selected }
        : option
    );
    setAmenitiesOptions(updatedOptions);
  };

  const clearAllFilters = () => {
    const clearedSortOptions = sortOptions.map(option => ({
      ...option,
      selected: option.id === 'relevance',
    }));
    setSortOptions(clearedSortOptions);
    
    const clearedVehicleOptions = vehicleTypeOptions.map(option => ({
      ...option,
      selected: false,
    }));
    setVehicleTypeOptions(clearedVehicleOptions);
    
    const clearedCapacityOptions = capacityOptions.map(option => ({
      ...option,
      selected: false,
    }));
    setCapacityOptions(clearedCapacityOptions);
    
    const clearedAmenitiesOptions = amenitiesOptions.map(option => ({
      ...option,
      selected: false,
    }));
    setAmenitiesOptions(clearedAmenitiesOptions);
    
    setPriceRange({ min: 100, max: 1000 });
  };

  const handleApply = () => {
    const appliedFilters = {
      sortBy: sortOptions.find(opt => opt.selected)?.id || 'relevance',
      vehicleType: vehicleTypeOptions.filter(opt => opt.selected).map(opt => opt.id),
      capacity: capacityOptions.find(opt => opt.selected)?.id || null,
      priceRange: priceRange,
      amenities: amenitiesOptions.filter(opt => opt.selected).map(opt => opt.id),
    };
    onApply(appliedFilters);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={[styles.modalContainer]}>
          <Animated.View style={[styles.filterModalContent, { height: modalHeight }, animatedStyle]}>
            <GestureDetector gesture={gesture}>
              <View>
                <View style={styles.grabberContainer}>
                  <View style={styles.grabber} />
                </View>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Filters</Text>
                  <TouchableOpacity onPress={clearAllFilters}>
                    <Text style={styles.clearText}>Clear All</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </GestureDetector>

            <ScrollView
              ref={scrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Sort By Section */}
              <View style={styles.filterSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Sort By</Text>
                </View>
                
                <View style={styles.optionsContainer}>
                  {sortOptions.map(option => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.capacityOptionButton,
                        option.selected && styles.selectedCapacityOption
                      ]}
                      onPress={() => selectSort(option.id)}
                    >
                      <Text style={[
                        styles.optionText,
                        option.selected && styles.selectedCapacityOptionText
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Separator Line */}
              <View style={styles.sectionSeparator} />

              {/* Vehicle Type Section */}
              <View style={styles.filterSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Vehicle Type</Text>
                </View>
                
                <View style={styles.optionsContainer}>
                  {vehicleTypeOptions.map(option => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.vehicleOptionButton,
                        option.selected && styles.selectedOption
                      ]}
                      onPress={() => toggleVehicleType(option.id)}
                    >
                      <Text style={[
                        styles.optionText,
                        option.selected && styles.selectedOptionText
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Separator Line */}
              <View style={styles.sectionSeparator} />

              {/* Capacity Section */}
              <View style={styles.filterSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Capacity</Text>
                </View>
                
                <View style={styles.optionsContainer}>
                  {capacityOptions.map(option => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.capacityOptionButton,
                        option.selected && styles.selectedCapacityOption
                      ]}
                      onPress={() => selectCapacity(option.id)}
                    >
                      <Text style={[
                        styles.optionText,
                        option.selected && styles.selectedCapacityOptionText
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Separator Line */}
              <View style={styles.sectionSeparator} />

              {/* Price Range Section */}
              <View style={styles.filterSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Price Range</Text>
                </View>
                
                <View style={styles.priceRangeContainer}>
                  <View style={styles.priceLabelsContainer}>
                    <Text style={styles.priceLabel}>Min: ${priceRange.min}</Text>
                    <Text style={styles.priceLabel}>Max: ${priceRange.max}</Text>
                  </View>
                  
                  <View style={styles.rangeSliderContainer}>
                    <RangeSlider
                      min={50}
                      max={2000}
                      minValue={priceRange.min}
                      maxValue={priceRange.max}
                      onValueChange={(min, max) => setPriceRange({ min, max })}
                      step={10}
                      width={280}
                    />
                  </View>
                </View>
              </View>

              {/* Separator Line */}
              <View style={styles.sectionSeparator} />

              {/* Amenities Section */}
              <View style={styles.filterSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Amenities</Text>
                </View>
                
                <View style={styles.amenitiesContainer}>
                  {amenitiesOptions.map(option => {
                    const getAmenityIcon = (id: string) => {
                      switch (id) {
                        case 'wifi':
                          return 'wifi';
                        case 'ac':
                          return 'snow';
                        case 'non-ac':
                          return 'thermometer-outline';
                        case 'semi-sleeper':
                          return 'bed-outline';
                        case 'seater':
                          return 'person-outline';
                        default:
                          return 'checkmark-circle-outline';
                      }
                    };

                    return (
                      <TouchableOpacity
                        key={option.id}
                        style={styles.amenityItem}
                        onPress={() => toggleAmenity(option.id)}
                      >
                        <View style={styles.amenityContent}>
                          <View style={styles.iconCard}>
                            <Ionicons 
                              name={getAmenityIcon(option.id)} 
                              size={18} 
                              color={COLORS.primary} 
                            />
                          </View>
                          <Text style={styles.amenityLabel}>{option.label}</Text>
                          <View
                            style={[
                              styles.checkbox,
                              option.selected && styles.checkedBox,
                            ]}
                          >
                            {option.selected && (
                              <Text style={styles.checkmark}>✓</Text>
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const getStyles = (COLORS: any, FONTS: any, SIZES: any) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    filterModalContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: COLORS.white,
      borderTopLeftRadius: SIZES.radius * 2,
      borderTopRightRadius: SIZES.radius * 2,
    },
    grabberContainer: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    grabber: {
      width: 40,
      height: 5,
      backgroundColor: COLORS.gray,
      borderRadius: 3,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      paddingHorizontal: SIZES.padding,
      paddingVertical: SIZES.base,
      paddingBottom: SIZES.base * 2,
      borderBottomColor: COLORS.gray2 || '#E0E0E0',
    },
    headerTitle: {
      ...FONTS.h2,
      color: COLORS.black,
    },
    clearText: {
      ...FONTS.body4,
      color: COLORS.primary,
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: SIZES.padding,
      marginBottom: SIZES.padding * 3,
      paddingTop: SIZES.padding
    },
    filterSection: {
      marginBottom: SIZES.padding * 1.5,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SIZES.padding,
    },
    sectionTitle: {
      ...FONTS.h4,
      color: COLORS.black,
      fontWeight: 'bold',
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SIZES.base * 1.5,
    },
    vehicleOptionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.padding,
      paddingVertical: SIZES.base + 2,
      borderRadius: SIZES.radius * 2,
      borderWidth: 1,
      borderColor: COLORS.gray2 || '#E0E0E0',
      backgroundColor: COLORS.white,
      minWidth: 80,
      justifyContent: 'center',
    },
    capacityOptionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SIZES.base + 2,
      borderRadius: SIZES.radius,
      borderWidth: 1,
      borderColor: COLORS.gray2 || '#E0E0E0',
      backgroundColor: COLORS.white,
      paddingHorizontal: SIZES.padding * 0.5,
      justifyContent: 'center',
    },
    selectedOption: {
      borderColor: COLORS.primary,
      backgroundColor: '#F4FAF9',
      borderWidth: 2,
    },
    optionText: {
      ...FONTS.body4,
      color: COLORS.black,
      fontWeight: '500',
    },
    selectedOptionText: {
      color: COLORS.primary,
    },
    selectedCapacityOption: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primary,
      borderWidth: 2,
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    selectedCapacityOptionText: {
      color: COLORS.white,
    },
    priceRangeContainer: {
      paddingHorizontal: SIZES.base,
    },
    priceLabelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SIZES.base,
      paddingHorizontal: SIZES.base,
    },
    priceLabel: {
      ...FONTS.body4,
      color: '#4B5563',
      fontWeight: 'bold',
    },
    rangeSliderContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    amenitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SIZES.base,
    },
    amenityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: SIZES.base,
    },
    amenityContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      paddingHorizontal: SIZES.base,
    },
    iconCard: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: COLORS.lightWhite || '#F8F9FA',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SIZES.padding,
      borderWidth: 1,
      borderColor: COLORS.gray2 || '#E0E0E0',
    },
    amenityIcon: {
      marginRight: SIZES.base,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 25,
      height: 25,
      borderWidth: 1.5,
      borderColor: COLORS.gray2 || '#E0E0E0',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
    },
    checkedBox: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    checkmark: {
      color: COLORS.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    amenityLabel: {
      ...FONTS.body4,
      color: COLORS.black,
      fontWeight: '500',
      flex: 1,
    },
    sectionSeparator: {
      height: 1,
      backgroundColor: COLORS.gray2 || '#E0E0E0',
      width: '100%',
      alignSelf: 'center',
      marginVertical: SIZES.padding,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 0.8,
        paddingBottom: SIZES.padding * 0.8,
        borderTopLeftRadius: SIZES.radius * 2,
        borderTopRightRadius: SIZES.radius * 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    applyButton: {
        backgroundColor: '#00A799',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: SIZES.radius,
        flex: 1,
        shadowColor: '#00A799',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    applyButtonText: {
        color: COLORS.white,
        ...FONTS.body4,
        fontWeight: '600',
    },
  });

export default FilterModal;