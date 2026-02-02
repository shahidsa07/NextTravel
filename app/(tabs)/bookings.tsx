import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/theme';

const BookingsScreen = () => {
    const router = useRouter();
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
            departure: 'Downtown Hotel',
            destination: 'Historical District',
            vehicle: 'Luxury Coach',
            duration: '6 hours'
        },
        {
            id: '2',
            title: 'Corporate Retreat',
            date: 'Aug 05, 2026 • 08:30 AM',
            bookingId: '#CL-884521',
            image: 'https://images.unsplash.com/photo-1532989623723-d340d8a43f9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            confirmed: true,
            departure: 'Corporate Plaza',
            destination: 'Mountain Resort',
            vehicle: 'Executive Shuttle',
            duration: '8 hours'
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
            departure: 'Grand Plaza Hotel',
            destination: 'Grand Estate',
            vehicle: 'Premium Coach',
            duration: '8 hours'
        },
        {
            id: '4',
            title: 'Airport Transfer',
            date: 'Nov 28, 2025 • 06:00 AM',
            bookingId: '#CL-880956',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            completed: true,
            rating: 4,
            departure: 'City Center Hotel',
            destination: 'International Airport',
            vehicle: 'Executive Sedan',
            duration: '1.5 hours'
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
                                        <Text style={styles.notificationCount}>3</Text>
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
                                    <View style={styles.notificationDot}>
                                        <Text style={styles.notificationCount}>2</Text>
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
                            <View style={styles.ticketHeader}>
                                <View style={styles.ticketHeaderTop}>
                                    <View style={styles.confirmedBadge}>
                                        <Ionicons name="checkmark-circle" size={14} color="#FFFFFF" />
                                        <Text style={styles.confirmedText}>CONFIRMED</Text>
                                    </View>
                                    <View style={styles.priorityBadge}>
                                        <Ionicons name="diamond" size={12} color="#00A799" />
                                        <Text style={styles.priorityText}>PRIORITY</Text>
                                    </View>
                                </View>
                                <View style={styles.ticketMainInfo}>
                                    <Text style={styles.ticketDate}>FEBRUARY 24, 2026 • 14:30</Text>
                                    <Text style={styles.ticketTitle}>Wedding Shuttle Service</Text>

                                    {/* Premium Route Section */}
                                    <View style={styles.premiumRouteContainer}>
                                        <View style={styles.departureSection}>
                                            <View style={styles.locationIconWrapper}>
                                                <Ionicons name="ellipse" size={8} color="#00A799" />
                                            </View>
                                            <View style={styles.locationDetails}>
                                                <Text style={styles.locationLabel}>DEPARTURE</Text>
                                                <Text style={styles.locationName}>Grand Plaza Hotel</Text>
                                                <Text style={styles.locationAddress}>123 Downtown Avenue, Suite 4B</Text>
                                            </View>
                                        </View>

                                        <View style={styles.routeConnector}>
                                            <View style={styles.routeLine} />
                                            <View style={styles.routeArrowContainer}>
                                                <Ionicons name="bus" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.routeLine} />
                                        </View>

                                        <View style={styles.destinationSection}>
                                            <View style={styles.locationIconWrapper}>
                                                <Ionicons name="location" size={10} color="#00A799" />
                                            </View>
                                            <View style={styles.locationDetails}>
                                                <Text style={styles.locationLabel}>DESTINATION</Text>
                                                <Text style={styles.locationName}>Rosewood Estate</Text>
                                                <Text style={styles.locationAddress}>456 Garden Valley Road, Main Entrance</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Ticket Separator with Cutouts */}
                            <View style={styles.ticketSeparator}>
                                <View style={styles.leftCutout} />
                                <View style={styles.dottedLine} />
                                <View style={styles.rightCutout} />
                            </View>

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
                                            <Ionicons name="bus" size={18} color={'#00A799'} />
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

                                {/* Ticket Stub Section */}
                                <View style={styles.ticketStub}>
                                    <View style={styles.stubDetailsRow}>
                                        <View style={styles.bookingReferenceRow}>
                                            <Text style={styles.stubLabel}>BOOKING REFERENCE</Text>
                                            <Text style={styles.stubValue}>#CL-882941</Text>
                                        </View>
                                        <View style={styles.stubRight}>
                                            <View style={styles.qrCodePlaceholder}>
                                                <Ionicons name="qr-code" size={24} color="#00A799" />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.bottomSection}>
                                    <View style={styles.actionButtons}>
                                        <TouchableOpacity style={styles.secondaryButton}>
                                            <Ionicons name="share-outline" size={16} color="#00A799" />
                                            <Text style={styles.secondaryButtonText}>Share</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/ticket')}>
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
                            <View key={trip.id} style={styles.premiumTripCard}>
                                <View style={styles.tripCardHeader}>
                                    <View style={styles.tripCardTitleSection}>
                                        <Text style={styles.premiumTripTitle}>{trip.title}</Text>
                                        <Text style={styles.tripDatePremium}>{trip.date}</Text>
                                    </View>
                                    <View style={styles.confirmedStatusBadge}>
                                        <Ionicons name="checkmark-circle" size={14} color="#00A799" />
                                        <Text style={styles.confirmedStatusText}>Confirmed</Text>
                                    </View>
                                </View>

                                <View style={styles.tripDetailsSection}>
                                    <View style={styles.tripDetailRow}>
                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="ellipse" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>DEPARTURE</Text>
                                                <Text style={styles.tripDetailValue}>{trip.departure}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="location" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>DESTINATION</Text>
                                                <Text style={styles.tripDetailValue}>{trip.destination}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.tripDetailRow}>
                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="bus" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>VEHICLE</Text>
                                                <Text style={styles.tripDetailValue}>{trip.vehicle}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="time" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>DURATION</Text>
                                                <Text style={styles.tripDetailValue}>{trip.duration}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.tripCardFooter}>
                                    <View style={styles.bookingReference}>
                                        <Text style={styles.bookingRefLabel}>BOOKING ID</Text>
                                        <Text style={styles.bookingRefValue}>{trip.bookingId}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.viewDetailsButton} activeOpacity={0.8}>
                                        <Text style={styles.viewDetailsText}>View Details</Text>
                                        <Ionicons name="chevron-forward" size={16} color="#00A799" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    // Past Trips Content
                    <View style={styles.contentContainer}>
                        <Text style={styles.sectionTitle}>TRAVEL HISTORY</Text>

                        {pastTrips.map(trip => (
                            <View key={trip.id} style={styles.premiumTripCard}>
                                <View style={styles.tripCardHeader}>
                                    <View style={styles.tripCardTitleSection}>
                                        <Text style={styles.premiumTripTitle}>{trip.title}</Text>
                                        <Text style={styles.tripDatePremium}>{trip.date}</Text>
                                    </View>
                                    <View style={styles.ratingContainer}>
                                        {[...Array(5)].map((_, index) => (
                                            <Ionicons
                                                key={index}
                                                name="star"
                                                size={14}
                                                color={index < trip.rating ? "#FFC700" : "#E0E0E0"}
                                            />
                                        ))}
                                    </View>
                                </View>

                                <View style={styles.tripDetailsSection}>
                                    <View style={styles.tripDetailRow}>
                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="ellipse" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>DEPARTURE</Text>
                                                <Text style={styles.tripDetailValue}>{trip.departure}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="location" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>DESTINATION</Text>
                                                <Text style={styles.tripDetailValue}>{trip.destination}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.tripDetailRow}>
                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="bus" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>VEHICLE</Text>
                                                <Text style={styles.tripDetailValue}>{trip.vehicle}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tripDetailItem}>
                                            <View style={styles.tripDetailIcon}>
                                                <Ionicons name="time" size={16} color="#00A799" />
                                            </View>
                                            <View style={styles.tripDetailContent}>
                                                <Text style={styles.tripDetailLabel}>DURATION</Text>
                                                <Text style={styles.tripDetailValue}>{trip.duration}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.tripCardFooter}>
                                    <View style={styles.bookingReference}>
                                        <Text style={styles.bookingRefLabel}>BOOKING ID</Text>
                                        <Text style={styles.bookingRefValue}>{trip.bookingId}</Text>
                                    </View>
                                    <View style={styles.completedBadge}>
                                        <Text style={styles.completedText}>COMPLETED</Text>
                                    </View>
                                </View>
                            </View>
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
    activeTabText: { ...FONTS.h5, color: COLORS.black, fontWeight: '700' },
    notificationDot: { backgroundColor: '#1F2937', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 8 },
    notificationCount: { ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' },
    historyIndicator: { marginLeft: 8 },
    scrollContent: { paddingHorizontal: SIZES.padding * 1, paddingVertical: SIZES.padding * 0.1, marginBottom: SIZES.padding },
    contentContainer: { paddingBottom: SIZES.padding * 2 },
    sectionTitle: { ...FONTS.h5, color: COLORS.gray, marginVertical: SIZES.padding, letterSpacing: 1 },
    nextExperienceCard: { backgroundColor: COLORS.white, borderRadius: 20, marginBottom: SIZES.padding * 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    ticketHeader: {
        backgroundColor: '#fff',
        paddingHorizontal: SIZES.padding * 1.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10
    },
    ticketHeaderTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    confirmedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00A799',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    confirmedText: {
        ...FONTS.body5,
        color: COLORS.white,
        fontWeight: '700',
        marginLeft: 4,
        letterSpacing: 0.5,
    },
    priorityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0F2F1',
    },
    priorityText: {
        ...FONTS.body5,
        color: '#00A799',
        fontWeight: '700',
        marginLeft: 4,
        letterSpacing: 0.5,
    },
    ticketMainInfo: {
        alignItems: 'flex-start',
    },
    ticketDate: {
        ...FONTS.body4,
        color: COLORS.gray,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    ticketTitle: {
        ...FONTS.h2,
        color: COLORS.black,
        fontWeight: '700',
        marginTop: 8,
    },
    ticketLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ticketLocation: {
        ...FONTS.body3,
        color: COLORS.black,
        marginLeft: 6,
        fontWeight: '500',
    },
    premiumRouteContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: SIZES.padding * 0.8,
        marginTop: SIZES.padding * 0.5,
        marginBottom: SIZES.padding * 0.5,
        width: '100%',
    },
    departureSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SIZES.padding * 0.8,
    },
    locationIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F0F9F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    locationDetails: {
        flex: 1,
        marginLeft: SIZES.padding,
    },
    locationLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        fontWeight: '600',
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    locationName: {
        ...FONTS.h4,
        color: COLORS.black,
        fontWeight: '700',
        marginBottom: 2,
    },
    locationAddress: {
        ...FONTS.body5,
        color: COLORS.gray,
        lineHeight: 18,
    },
    routeConnector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SIZES.padding * 0.3,
        paddingHorizontal: SIZES.padding,
    },
    routeLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#E0E0E0',
    },
    routeArrowContainer: {
        backgroundColor: '#F0F9F8',
        borderRadius: 20,
        padding: 8,
        marginHorizontal: SIZES.padding * 0.5,
    },
    destinationSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: SIZES.padding * 0.3,
    },
    journeyMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
        paddingTop: SIZES.padding * 0.8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    metaDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    metaText: {
        ...FONTS.body5,
        color: COLORS.gray,
        marginLeft: SIZES.base,
        fontWeight: '500',
    },
    ticketSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        backgroundColor: COLORS.lightWhite,
        marginVertical: 0,
        position: 'relative',
    },
    leftCutout: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.lightWhite,
        position: 'absolute',
        left: -10,
        zIndex: 2,
    },
    dottedLine: {
        flex: 1,
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#D0D0D0',
        marginHorizontal: 10,
    },
    rightCutout: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.lightWhite,
        position: 'absolute',
        right: -10,
        zIndex: 2,
    },
    cardDetails: { padding: SIZES.padding },
    detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    detailItem: { width: '48%', marginBottom: SIZES.padding },
    detailIconContainer: { backgroundColor: COLORS.lightGray, padding: 8, borderRadius: SIZES.radius },
    detailTextContainer: { marginLeft: 8 },
    detailLabel: { ...FONTS.body5, color: COLORS.gray },
    detailText: { ...FONTS.h5, color: COLORS.black, marginTop: 4, fontWeight: '500' },
    separator: { height: 1, backgroundColor: '#D0D0D0', marginVertical: SIZES.padding * 0.2 },
    bottomSection: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: SIZES.padding },
    bookingInfo: { flex: 1 },
    bookingLabel: { ...FONTS.body5, color: COLORS.gray },
    bookingId: { ...FONTS.h4, color: COLORS.black, fontWeight: 'bold', marginTop: 4 },
    actionButtons: { flexDirection: 'row' },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: SIZES.radius,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#00A799'
    },
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
    ticketStub: { marginTop: SIZES.padding * 0.5 },
    bookingReferenceRow: { flexDirection: 'column', justifyContent: 'space-between', marginBottom: SIZES.base },
    stubLabel: { ...FONTS.body5, color: COLORS.gray },
    stubValue: { ...FONTS.h5, color: COLORS.black, fontWeight: 'bold' },
    stubDetailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    stubLeft: { flex: 1 },
    stubRight: { alignItems: 'flex-end' },
    qrCodePlaceholder: { backgroundColor: COLORS.lightGray, padding: 12, borderRadius: SIZES.radius },
    premiumTripCard: { backgroundColor: COLORS.white, borderRadius: 20, marginBottom: SIZES.padding * 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, padding: SIZES.padding },
    tripCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.padding },
    tripCardTitleSection: { flex: 1 },
    premiumTripTitle: { ...FONTS.h4, color: COLORS.black, fontWeight: '700' },
    tripDatePremium: { ...FONTS.body5, color: COLORS.gray, marginTop: 4 },
    confirmedStatusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F2F1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    confirmedStatusText: { ...FONTS.body5, color: '#00A799', fontWeight: '700', marginLeft: 4, letterSpacing: 0.5 },
    tripDetailsSection: { marginBottom: SIZES.padding },
    tripDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SIZES.padding },
    tripDetailItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    tripDetailIcon: { backgroundColor: '#F0F9F8', padding: 8, borderRadius: SIZES.radius, marginRight: SIZES.padding },
    tripDetailContent: { flex: 1 },
    tripDetailLabel: { ...FONTS.body5, color: COLORS.gray, fontWeight: '600', letterSpacing: 0.8, marginBottom: 4 },
    tripDetailValue: { ...FONTS.h5, color: COLORS.black, fontWeight: '500' },
    tripCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    bookingReference: { flex: 1 },
    bookingRefLabel: { ...FONTS.body5, color: COLORS.gray },
    bookingRefValue: { ...FONTS.h5, color: COLORS.black, fontWeight: 'bold', marginTop: 4 },
    viewDetailsButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F2F1', paddingVertical: 8, paddingHorizontal: 12, borderRadius: SIZES.radius },
    viewDetailsText: { ...FONTS.body5, color: '#00A799', marginRight: 4 },
});

export default BookingsScreen;
