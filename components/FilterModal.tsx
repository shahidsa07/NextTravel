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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../constants/theme';

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
  const insets = useSafeAreaInsets();
  const styles = getStyles(COLORS, FONTS, SIZES, insets);

  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);

  // For now, only Vehicle Type category
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState<FilterOption[]>([
    { id: 'luxury', label: 'Luxury', selected: false },
    { id: 'executive', label: 'Executive', selected: false },
    { id: 'minibus', label: 'Minibus', selected: false },
    { id: 'standard', label: 'Standard', selected: false },
  ]);

  const modalHeight = '70%';

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0);
      setScrollOffset(0);
    }
  }, [visible, translateY]);

  // Gesture for modal dismissal
  const gesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (scrollOffset <= 0 && event.translationY > 0) {
        translateY.value = Math.max(0, startY.value + event.translationY);
      }
    })
    .onEnd(() => {
      if (scrollOffset <= 0 && translateY.value > 100) {
        runOnJS(onClose)();
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

  const toggleVehicleType = (optionId: string) => {
    const updatedOptions = vehicleTypeOptions.map(option =>
      option.id === optionId
        ? { ...option, selected: !option.selected }
        : option
    );
    setVehicleTypeOptions(updatedOptions);
  };

  const clearAllFilters = () => {
    const clearedOptions = vehicleTypeOptions.map(option => ({
      ...option,
      selected: false,
    }));
    setVehicleTypeOptions(clearedOptions);
  };

  const handleApply = () => {
    const appliedFilters = {
      vehicleType: vehicleTypeOptions.filter(opt => opt.selected).map(opt => opt.id),
    };
    onApply(appliedFilters);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.modalContainer}>
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
                        styles.optionButton,
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

const getStyles = (COLORS: any, FONTS: any, SIZES: any, insets: any) =>
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
      marginBottom: SIZES.padding,
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
      color: COLORS.gray,
      fontWeight: 'bold',
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SIZES.base,
    },
    optionButton: {
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
    selectedOption: {
      borderColor: COLORS.primary,
      backgroundColor: '#F4FAF9',
      borderWidth: 2,
    },
    optionText: {
      ...FONTS.body4,
      color: '#4B5563',
      fontWeight: '500',
    },
    selectedOptionText: {
      color: COLORS.primary,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 0.8,
        paddingBottom: insets.bottom + SIZES.padding * 0.8,
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