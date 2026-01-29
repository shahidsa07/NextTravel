
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const { COLORS, FONTS, SIZES, isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const styles = getStyles(COLORS, FONTS, SIZES);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/profile')}>
        <Ionicons name="person-outline" size={24} color={COLORS.black} />
        <Text style={styles.menuItemText}>Profile</Text>
      </TouchableOpacity>
      <View style={styles.menuItem}>
        <Ionicons name={isDarkMode ? "moon-outline" : "sunny-outline"} size={24} color={COLORS.black} />
        <Text style={styles.menuItemText}>{isDarkMode ? 'Dark' : 'Light'} Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>
    </View>
  );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  menuItemText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginLeft: SIZES.base,
    flex: 1,
  },
});

export default SettingsScreen;
