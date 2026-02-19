
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/theme';

const BusDetailsScreen = () => {
    const router = useRouter();
    const { COLORS, FONTS, SIZES } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getStyles(COLORS, FONTS, SIZES, insets);

    const amenities = {
        'PREMIUM AMENITIES': [
            { icon: 'checkbox-outline', name: 'Leather Seats' },
            { icon: 'expand-outline', name: 'Panoramic Roof' },
            { icon: 'hardware-chip-outline', name: 'USB Charging' },
            { icon: 'eye-off-outline', name: 'Privacy Glass' },
            { icon: 'tv-outline', name: 'HD Screens' },
            { icon: 'briefcase-outline', name: 'Work Tables' },
        ]
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                    style={styles.headerImage}
                >
                    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton}>
                            <Ionicons name="share-outline" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageCounter}>
                        <Text style={styles.imageCounterText}>1 / 5</Text>
                    </View>
                </ImageBackground>

                <View style={styles.container}>
                    <View style={styles.titleSection}>
                        <View style={styles.platinumBadge}>
                            <Text style={styles.platinumText}>PLATINUM SERIES</Text>
                        </View>
                        <Text style={styles.busTitle}>Prestige Executive Coach</Text>
                    </View>

                    <View style={styles.featuresSection}>
                        <View style={styles.featureCard}>
                            <Ionicons name="people-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.featureLabel}>CAPACITY</Text>
                            <Text style={styles.featureValue}>45 Seater</Text>
                        </View>
                        <View style={styles.featureCard}>
                            <Ionicons name="wifi-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.featureLabel}>CONNECTIVITY</Text>
                            <Text style={styles.featureValue}>WiFi Enabled</Text>
                        </View>
                        <View style={styles.featureCard}>
                            <Ionicons name="snow-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.featureLabel}>COMFORT</Text>
                            <Text style={styles.featureValue}>Climate Control</Text>
                        </View>
                    </View>

                    <View style={styles.aboutSection}>
                        <Text style={styles.sectionTitle}>ABOUT THIS VEHICLE</Text>
                        <Text style={styles.aboutText}>
                            Experience the pinnacle of ground transportation. The Prestige Executive Coach combines bespoke craftsmanship with state-of-the-art technology. Designed for corporate retreats and high-profile events, every detail from the hand-stitched leather upholstery to the panoramic glass roof has been curated to provide an unparalleled travel experience.
                        </Text>
                    </View>

                    {Object.keys(amenities).map(sectionTitle => (
                        <View key={sectionTitle} style={styles.amenitiesSection}>
                            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                            <View style={styles.amenitiesGrid}>
                                {amenities[sectionTitle].map(item => (
                                    <View key={item.name} style={styles.amenityItem}>
                                        <Ionicons name={item.icon} size={24} color={COLORS.primary} />
                                        <Text style={styles.amenityText}>{item.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : SIZES.padding }]}>
                <View>
                    <Text style={styles.rateLabel}>DAILY RATE</Text>
                    <Text style={styles.rateValue}>$650 <Text style={styles.rateSubValue}>/ Day</Text></Text>
                </View>
                <TouchableOpacity style={styles.bookingButton}>
                    <Text style={styles.bookingButtonText}>Proceed to Booking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const getStyles = (COLORS, FONTS, SIZES, insets) => StyleSheet.create({
    headerImage: {
        height: 300,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
    },
    headerButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: SIZES.radius * 2,
    },
    imageCounter: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: SIZES.radius,
        alignSelf: 'center',
        bottom: SIZES.padding,
    },
    imageCounterText: {
        color: COLORS.white,
        ...FONTS.body5,
    },
    container: {
        padding: SIZES.padding,
    },
    titleSection: {
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    platinumBadge: {
        backgroundColor: '#E6F6F5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: SIZES.radius,
        alignSelf: 'flex-start',
    },
    platinumText: {
        color: '#00A799',
        ...FONTS.h6,
        fontWeight: 'bold',
    },
    busTitle: {
        ...FONTS.h1,
        fontSize: 36,
        color: COLORS.black,
        marginTop: SIZES.base,
        fontFamily: 'serif',
    },
    featuresSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: SIZES.padding,
    },
    featureCard: {
        backgroundColor: '#F8F9FA',
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        width: '30%',
    },
    featureLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        marginTop: SIZES.base,
    },
    featureValue: {
        ...FONTS.h5,
        color: COLORS.black,
        marginTop: 2,
    },
    aboutSection: {
        padding: SIZES.padding,
    },
    sectionTitle: {
        ...FONTS.h5,
        color: COLORS.gray,
        marginBottom: SIZES.base,
        letterSpacing: 1,
    },
    aboutText: {
        ...FONTS.body3,
        color: COLORS.black,
        lineHeight: 24,
    },
    amenitiesSection: {
        padding: SIZES.padding,
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: SIZES.padding,
    },
    amenityText: {
        ...FONTS.body3,
        color: COLORS.black,
        marginLeft: SIZES.base,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
    },
    rateLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
    },
    rateValue: {
        ...FONTS.h2,
        color: COLORS.black,
    },
    rateSubValue: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    bookingButton: {
        backgroundColor: '#00A799',
        padding: SIZES.padding * 1.5,
        borderRadius: SIZES.radius * 1.5,
        paddingHorizontal: SIZES.padding * 3
    },
    bookingButtonText: {
        color: COLORS.white,
        ...FONTS.h4,
    },
});

export default BusDetailsScreen;
