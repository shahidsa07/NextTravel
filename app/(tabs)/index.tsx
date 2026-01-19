
import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useRouter } from 'expo-router';
import Search from '../../components/Search';

const MOCK_FEATURED = [
  // { id: '1', name: 'Weekend in the Hills', image: require('../../assets/images/featured1.png'), price: '$150' },
  // { id: '2', name: 'Beach Getaway', image: require('../../assets/images/featured2.png'), price: '$250' },
];

const HomeScreen = () => {
  const router = useRouter();

  const handleSearch = (query) => {
    router.push(`/search/results?query=${query}`);
  };

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity style={styles.featuredItem} onPress={() => router.push(`/services/${item.id}`)}>
      <Image source={item.image} style={styles.featuredImage} />
      <Text style={styles.featuredTitle}>{item.name}</Text>
      <Text style={styles.featuredPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Back!</Text>
        <Text style={styles.headerSubtitle}>Where do you want to go today?</Text>
      </View>

      <View style={styles.section}>
        <Search onSearch={handleSearch} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Trips</Text>
        <FlatList
          data={MOCK_FEATURED}
          renderItem={renderFeaturedItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Add more sections like 'Categories' or 'Top Rated' here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  headerSubtitle: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  section: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
    marginBottom: SIZES.padding,
  },
  featuredItem: {
    marginRight: SIZES.padding,
    width: SIZES.width * 0.7,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    borderRadius: SIZES.radius,
  },
  featuredTitle: {
    ...FONTS.h4,
    marginTop: SIZES.base,
  },
  featuredPrice: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
});

export default HomeScreen;
