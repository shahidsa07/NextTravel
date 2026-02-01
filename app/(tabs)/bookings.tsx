import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/theme';

const BookingsScreen = () => {
    const { COLORS, FONTS, SIZES } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getStyles(COLORS, FONTS, SIZES);
    const [activeTab, setActiveTab] = useState('Upcoming');

    const otherTrips = [
        {
            id: '1',
            title: 'Heritage City Discovery',
            date: 'July 12, 2026 • 09:00 AM',
            bookingId: '#CL-883012',
            image: 'https://images.unsplash.com/photo-1566411711533-6334f2018596?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            confirmed: true,
            destination: 'Historical District',
            vehicle: 'Luxury Coach'
        },
        {
            id: '2',
            title: 'Corporate Retreat',
            date: 'Aug 05, 2026 • 08:30 AM',
            bookingId: '#CL-884521',
            image: 'https://images.unsplash.com/photo-1532989623723-d340d8a43f9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            confirmed: true,
            destination: 'Mountain Resort',
            vehicle: 'Executive Shuttle'
        },
    ];

    const pastTrips = [
        {
            id: '3',
            title: 'Wedding Celebration',
            date: 'Dec 15, 2025 • 16:00 PM',
            bookingId: '#CL-881234',
            image: 'https://images.unsplash.com/photo-1597402518423-72535a0a3a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            completed: true,
            rating: 5,
            destination: 'Grand Estate'
        },
        {
            id: '4',
            title: 'Airport Transfer',
            date: 'Nov 28, 2025 • 06:00 AM',
            bookingId: '#CL-880956',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            completed: true,
            rating: 4,
            destination: 'International Airport'
        }
    ];

    return (
        <View style={styles.container}>
            {/* Fixed Premium Header */}
            <View style={[styles.headerContainer, { paddingTop: insets.top + 20 }]}>
                <View style={styles.headerContent}>
                    <View style={styles.headerTitleSection}>
                        <Text style={styles.headerTitle}>My Journeys</Text>
                        <Text style={styles.headerSubtitle}>Exquisite travel experiences</Text>
                    </View>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.black} />
                    </TouchableOpacity>
                </View>

                {/* Premium Tab Container */}
                <View style={styles.tabContainer}>
                    <View style={styles.tabWrapper}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
                            onPress={() => setActiveTab('Upcoming')}
                            activeOpacity={0.8}>
                            <View style={styles.tabContentContainer}>
                                <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>
                                    Upcoming
                                </Text>
                                {activeTab === 'Upcoming' && (
                                    <View style={styles.notificationDot}>
                                        <Text style={styles.notificationCount}>2</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Past Trips' && styles.activeTab]}
                            onPress={() => setActiveTab('Past Trips')}
                            activeOpacity={0.8}>
                            <View style={styles.tabContentContainer}>
                                <Text style={[styles.tabText, activeTab === 'Past Trips' && styles.activeTabText]}>
                                    Past Trips
                                </Text>
                                {activeTab === 'Past Trips' && (
                                    <View style={styles.historyIndicator}>
                                        <Ionicons name="star" size={8} color="#00A799" />
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {activeTab === 'Upcoming' ? (
                    <View style={styles.contentContainer}>
                        <Text style={styles.sectionTitle}>NEXT EXPERIENCE</Text>
                        
                        {/* Premium Next Experience Card */}
                        <View style={styles.nextExperienceCard}>
                            <ImageBackground
                                source={{ uri: 'https://images.unsplash.com/photo-1597402518423-72535a0a3a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                                style={styles.heroImage}
                                imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <View style={styles.heroOverlay}>
                                    <View style={styles.heroHeader}>
                                        <View style={styles.confirmedBadge}>
                                            <Ionicons name="checkmark-circle" size={14} color="#FFFFFF" />
                                            <Text style={styles.confirmedText}>CONFIRMED</Text>
                                        </View>
                                        <View style={styles.priorityBadge}>
                                            <Ionicons name="diamond" size={12} color="#00A799" />
                                            <Text style={styles.priorityText}>PRIORITY</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heroFooter}>
                                        <Text style={styles.heroDate}>FEBRUARY 24, 2026 • 14:30</Text>
                                        <Text style={styles.heroTitle}>Wedding Shuttle Service</Text>
                                        <Text style={styles.heroLocation}>
                                            <Ionicons name="location" size={14} color="#FFFFFF" /> Grand Plaza to Rosewood Estate
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                            
                            <View style={styles.cardDetails}>
                                <View style={styles.detailsGrid}>
                                    <View style={styles.detailItem}>
                                        <View style={styles.detailIconContainer}>
                                            <Ionicons name="location" size={18} color={'#00A799'} />
                                        </View>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>PICKUP LOCATION</Text>
                                            <Text style={styles.detailText}>Grand Plaza Hotel, Suite 4B</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.detailItem}>
                                        <View style={styles.detailIconContainer}>
                                            <Ionicons name="car-sport" size={18} color={'#00A799'} />
                                        </View>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>VEHICLE CLASS</Text>
                                            <Text style={styles.detailText}>Premium Executive Coach</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.detailItem}>
                                        <View style={styles.detailIconContainer}>
                                            <Ionicons name="time" size={18} color={'#00A799'} />
                                        </View>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>DURATION</Text>
                                            <Text style={styles.detailText}>4 hours • Round trip</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.detailItem}>
                                        <View style={styles.detailIconContainer}>
                                            <Ionicons name="people" size={18} color={'#00A799'} />
                                        </View>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>PASSENGERS</Text>
                                            <Text style={styles.detailText}>12 guests</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.separator} />
                                
                                <View style={styles.bottomSection}>
                                    <View style={styles.bookingInfo}>
                                        <Text style={styles.bookingLabel}>BOOKING REFERENCE</Text>
                                        <Text style={styles.bookingId}>#CL-882941</Text>
                                    </View>
                                    <View style={styles.actionButtons}>
                                        <TouchableOpacity style={styles.secondaryButton}>
                                            <Ionicons name="settings-outline" size={16} color="#00A799" />
                                            <Text style={styles.secondaryButtonText}>Manage</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.primaryButton}>
                                            <Ionicons name="ticket" size={16} color={COLORS.white} />
                                            <Text style={styles.primaryButtonText}>View Ticket</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>UPCOMING JOURNEYS</Text>
                        
                        {/* Premium Trip Cards */}
                        {otherTrips.map(trip => (
                            <TouchableOpacity key={trip.id} style={styles.tripCard} activeOpacity={0.8}>
                                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                                <View style={styles.tripContent}>
                                    <View style={styles.tripHeader}>
                                        <Text style={styles.tripTitle}>{trip.title}</Text>
                                        <View style={styles.statusBadge}>
                                            <Ionicons name="checkmark-circle" size={12} color="#00A799" />
                                            <Text style={styles.statusText}>Confirmed</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.tripDate}>{trip.date}</Text>
                                    <View style={styles.tripMeta}>
                                        <View style={styles.metaItem}>
                                            <Ionicons name="location-outline" size={12} color={COLORS.gray} />
                                            <Text style={styles.metaText}>{trip.destination}</Text>
                                        </View>
                                        <View style={styles.metaItem}>
                                            <Ionicons name="car-outline" size={12} color={COLORS.gray} />
                                            <Text style={styles.metaText}>{trip.vehicle}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.tripBookingId}>{trip.bookingId}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    // Past Trips Content
                    <View style={styles.contentContainer}>
                        <Text style={styles.sectionTitle}>TRAVEL HISTORY</Text>
                        
                        {pastTrips.map(trip => (
                            <TouchableOpacity key={trip.id} style={styles.tripCard} activeOpacity={0.8}>
                                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                                <View style={styles.tripContent}>
                                    <View style={styles.tripHeader}>
                                        <Text style={styles.tripTitle}>{trip.title}</Text>
                                        <View style={styles.ratingContainer}>
                                            {[...Array(5)].map((_, index) => (
                                                <Ionicons
                                                    key={index}
                                                    name="star"
                                                    size={12}
                                                    color={index < trip.rating ? "#FFC700" : "#E0E0E0"}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <Text style={styles.tripDate}>{trip.date}</Text>
                                    <View style={styles.tripMeta}>
                                        <View style={styles.metaItem}>
                                            <Ionicons name="location-outline" size={12} color={COLORS.gray} />
                                            <Text style={styles.metaText}>{trip.destination}</Text>
                                        </View>
                                        <View style={styles.completedBadge}>
                                            <Text style={styles.completedText}>COMPLETED</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.tripBookingId}>{trip.bookingId}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: SIZES.padding * 1.5,
        paddingBottom: SIZES.padding * 0.2,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 1,
    },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitleSection: { flex: 1 },
    headerTitle: { ...FONTS.h2, color: COLORS.black },
    headerSubtitle: { ...FONTS.body4, color: COLORS.gray, marginTop: 4 },
    menuButton: { padding: 8 },
    tabContainer: { flexDirection: 'row', backgroundColor: '#F8F8FA', borderRadius: SIZES.radius, padding: 4, marginVertical: SIZES.padding },
    tabWrapper: { flexDirection: 'row', justifyContent: 'space-between', flex: 1, backgroundColor: '#F8F8FA', borderRadius: SIZES.radius },
    tab: { flex: 1, paddingVertical: 10, borderRadius: SIZES.radius - 4, alignItems: 'center' },
    activeTab: { backgroundColor: COLORS.white },
    tabContentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tabText: { ...FONTS.body4, color: COLORS.gray, marginLeft: 8 },
    activeTabText: { ...FONTS.h5, color: COLORS.black },
    notificationDot: { backgroundColor: '#1F2937', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 8 },
    notificationCount: { ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' },
    historyIndicator: { marginLeft: 8 },
    scrollContent: { paddingHorizontal: SIZES.padding * 1.5, paddingVertical: SIZES.padding * 1.5, marginBottom: SIZES.padding * 4 },
    contentContainer: { paddingBottom: SIZES.padding * 2 },
    sectionTitle: { ...FONTS.h5, color: COLORS.gray, marginVertical: SIZES.padding, letterSpacing: 1 },
    nextExperienceCard: { backgroundColor: COLORS.white, borderRadius: 20, marginBottom: SIZES.padding * 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    heroImage: { height: 220, justifyContent: 'flex-end' },
    heroOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: SIZES.padding, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    confirmedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00A799', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    confirmedText: { ...FONTS.body5, color: COLORS.white, fontWeight: 'bold', marginLeft: 4 },
    priorityBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    priorityText: { ...FONTS.body5, color: '#00A799', fontWeight: 'bold', marginLeft: 4 },
    heroFooter: { marginTop: 80 },
    heroDate: { ...FONTS.body4, color: COLORS.white },
    heroTitle: { ...FONTS.h1, color: COLORS.white, fontWeight: 'bold', marginTop: 4 },
    heroLocation: { ...FONTS.body4, color: COLORS.white, marginTop: 4, flexDirection: 'row', alignItems: 'center' },
    cardDetails: { padding: SIZES.padding },
    detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    detailItem: { width: '48%', marginBottom: SIZES.padding },
    detailIconContainer: { backgroundColor: COLORS.lightGray, padding: 8, borderRadius: SIZES.radius },
    detailTextContainer: { marginLeft: 8 },
    detailLabel: { ...FONTS.body5, color: COLORS.gray },
    detailText: { ...FONTS.h5, color: COLORS.black, marginTop: 4 },
    separator: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: SIZES.padding },
    bottomSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    bookingInfo: { flex: 1 },
    bookingLabel: { ...FONTS.body5, color: COLORS.gray },
    bookingId: { ...FONTS.h4, color: COLORS.black, fontWeight: 'bold', marginTop: 4 },
    actionButtons: { flexDirection: 'row' },
    secondaryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGray, paddingVertical: 12, paddingHorizontal: 20, borderRadius: SIZES.radius, marginRight: 8 },
    secondaryButtonText: { ...FONTS.h5, color: '#00A799', marginLeft: 8 },
    primaryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00A799', paddingVertical: 12, paddingHorizontal: 16, borderRadius: SIZES.radius },
    primaryButtonText: { ...FONTS.h5, color: COLORS.white, marginLeft: 8 },
    tripCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.base, marginBottom: SIZES.base, alignItems: 'center' },
    tripImage: { width: 80, height: 80, borderRadius: SIZES.radius - 4 },
    tripContent: { flex: 1, marginLeft: SIZES.base },
    tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    tripTitle: { ...FONTS.h4, color: COLORS.black },
    statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGray, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    statusText: { ...FONTS.body5, color: '#00A799', marginLeft: 4 },
    tripDate: { ...FONTS.body5, color: COLORS.gray, marginVertical: 4 },
    tripMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    metaItem: { flexDirection: 'row', alignItems: 'center' },
    metaText: { ...FONTS.body5, color: COLORS.gray, marginLeft: 4 },
    tripBookingId: { ...FONTS.body5, color: COLORS.gray, marginTop: 4 },
    ratingContainer: { flexDirection: 'row', alignItems: 'center' },
    completedBadge: { backgroundColor: '#00A799', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    completedText: { ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' },
});

export default BookingsScreen;
