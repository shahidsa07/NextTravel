
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Back!</Text>
        <Text style={styles.headerSubtitle}>Where do you want to go?</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Ionicons name="airplane" size={24} color={COLORS.white} />
            <Text style={styles.tabText}>Flight</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="train" size={24} color={COLORS.primary} />
            <Text style={styles.tabText}>Train</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="bed" size={24} color={COLORS.primary} />
            <Text style={styles.tabText}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="car" size={24} color={COLORS.primary} />
            <Text style={styles.tabText}>Car</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>From</Text>
            <TextInput style={styles.input} placeholder="Dallas" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>To</Text>
            <TextInput style={styles.input} placeholder="Texas City" />
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Departure</Text>
              <TextInput style={styles.input} placeholder="March 10, 2022" />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: SIZES.padding }]}>
              <Text style={styles.label}>Return</Text>
              <TextInput style={styles.input} placeholder="March 30, 2022" />
            </View>
          </View>
          <TouchableOpacity style={styles.searchButton}>
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
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.base,
    borderRadius: SIZES.radius,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  form: {},
  inputGroup: {
    marginBottom: SIZES.padding,
  },
  label: {
    ...FONTS.h4,
    marginBottom: SIZES.base,
  },
  input: {
    ...FONTS.body3,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
  },
  row: {
    flexDirection: 'row',
  },
  searchButton: {
    backgroundColor: COLORS.accent,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  searchButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default HomeScreen;
