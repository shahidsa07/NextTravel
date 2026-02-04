import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useTheme } from '../constants/theme';

interface RangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onValueChange: (min: number, max: number) => void;
  step?: number;
  width?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onValueChange,
  step = 1,
  width = 280,
}) => {
  const { COLORS } = useTheme();
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);

  const thumbSize = 20;
  const trackHeight = 4;
  const sliderWidth = width - thumbSize;
  
  // Shared values for positions
  const minPosition = useSharedValue(0);
  const maxPosition = useSharedValue(sliderWidth);
  const minStartPosition = useSharedValue(0);
  const maxStartPosition = useSharedValue(sliderWidth);

  // Update positions when prop values change
  useEffect(() => {
    const minPercentage = (minValue - min) / (max - min);
    const maxPercentage = (maxValue - min) / (max - min);
    minPosition.value = withSpring(minPercentage * sliderWidth);
    maxPosition.value = withSpring(maxPercentage * sliderWidth);
  }, [minValue, maxValue, min, max, sliderWidth]);

  const getValueFromPosition = (position: number): number => {
    const percentage = Math.max(0, Math.min(1, position / sliderWidth));
    const value = min + percentage * (max - min);
    const steppedValue = Math.round(value / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const updateValues = (newMinPos: number, newMaxPos: number) => {
    const newMinValue = getValueFromPosition(newMinPos);
    const newMaxValue = getValueFromPosition(newMaxPos);
    if (newMinValue !== minValue || newMaxValue !== maxValue) {
      onValueChange(newMinValue, newMaxValue);
    }
  };

  // Min thumb gesture
  const minPanGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(setActiveThumb)('min');
      minStartPosition.value = minPosition.value;
    })
    .onUpdate((event) => {
      const newPosition = Math.max(
        0, 
        Math.min(
          maxPosition.value - (step / (max - min)) * sliderWidth, 
          minStartPosition.value + event.translationX
        )
      );
      minPosition.value = newPosition;
      runOnJS(updateValues)(newPosition, maxPosition.value);
    })
    .onEnd(() => {
      runOnJS(setActiveThumb)(null);
    });

  // Max thumb gesture
  const maxPanGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(setActiveThumb)('max');
      maxStartPosition.value = maxPosition.value;
    })
    .onUpdate((event) => {
      const newPosition = Math.max(
        minPosition.value + (step / (max - min)) * sliderWidth, 
        Math.min(sliderWidth, maxStartPosition.value + event.translationX)
      );
      maxPosition.value = newPosition;
      runOnJS(updateValues)(minPosition.value, newPosition);
    })
    .onEnd(() => {
      runOnJS(setActiveThumb)(null);
    });

  const minThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: minPosition.value },
      { scale: withSpring(activeThumb === 'min' ? 1.2 : 1) }
    ],
  }));

  const maxThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: maxPosition.value },
      { scale: withSpring(activeThumb === 'max' ? 1.2 : 1) }
    ],
  }));

  const selectedTrackStyle = useAnimatedStyle(() => ({
    left: minPosition.value + thumbSize / 2,
    width: Math.max(0, maxPosition.value - minPosition.value),
  }));

  const styles = StyleSheet.create({
    container: {
      height: 40,
      justifyContent: 'center',
      paddingHorizontal: thumbSize / 2,
    },
    track: {
      height: trackHeight,
      backgroundColor: COLORS.gray2 || '#E0E0E0',
      borderRadius: trackHeight / 2,
      position: 'relative',
    },
    selectedTrack: {
      position: 'absolute',
      height: trackHeight,
      backgroundColor: COLORS.primary,
      borderRadius: trackHeight / 2,
    },
    thumb: {
      position: 'absolute',
      width: thumbSize,
      height: thumbSize,
      backgroundColor: COLORS.white,
      borderRadius: thumbSize / 2,
      borderWidth: 2,
      borderColor: COLORS.primary,
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
      top: -8,
    },
  });

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.track}>
        <Animated.View style={[styles.selectedTrack, selectedTrackStyle]} />
        
        <GestureDetector gesture={minPanGesture}>
          <Animated.View style={[styles.thumb, minThumbStyle]} />
        </GestureDetector>

        <GestureDetector gesture={maxPanGesture}>
          <Animated.View style={[styles.thumb, maxThumbStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
};

export default RangeSlider;