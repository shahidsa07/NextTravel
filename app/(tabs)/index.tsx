
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const HomeScreen = () => {
  const router = useRouter();
  const [from, setFrom] = useState('Malappuram');
  const [to, setTo] = useState('Wayanad');

  const handleSearch = () => {
    router.push({ pathname: 'search/results', params: { from, to } });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/(tabs)/notification')}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Your Journey With Us!</Text>
        <Text style={styles.headerSubtitle}>Where do you want to go?</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Ionicons name="bus" size={24} color={COLORS.white} />
            <Text style={[styles.tabText, { color: COLORS.white }]}>Bus/Traveller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="briefcase" size={24} color={COLORS.primary} />
            <Text style={styles.tabText}>Packages</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>From</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Dallas" placeholderTextColor={COLORS.gray} value={from} onChangeText={setFrom} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>To</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Texas City" placeholderTextColor={COLORS.gray} value={to} onChangeText={setTo} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Departure</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="March 10, 2022" placeholderTextColor={COLORS.gray} />
              </View>
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: SIZES.padding }]}>
              <Text style={styles.label}>Return</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="March 30, 2022" placeholderTextColor={COLORS.gray} />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    paddingBottom: SIZES.padding * 2,
    paddingTop: 100,
  },
  notificationButton: {
    position: 'absolute',
    top: 50,
    right: SIZES.padding,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...FONTS.body3,
    color: COLORS.white,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    margin: SIZES.padding,
    marginTop: -SIZES.padding,
    padding: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.padding,
  },
  tab: {
    alignItems: 'center',
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    minWidth: 120,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body4,
    color: COLORS.black,
    marginTop: SIZES.base / 2,
  },
  form: {},
  inputGroup: {
    marginBottom: SIZES.padding,
  },
  label: {
    ...FONTS.h4,
    marginBottom: SIZES.base,
    color: COLORS.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    height: 50,
  },
  inputIcon: {
    marginRight: SIZES.base,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding / 1.5,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  searchButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default HomeScreen;
