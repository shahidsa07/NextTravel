
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
import { useTheme } from '../../constants/theme';

const BookingsScreen = () => {
    const { COLORS, FONTS, SIZES } = useTheme();
    const styles = getStyles(COLORS, FONTS, SIZES);
    const [activeTab, setActiveTab] = useState('Upcoming');

    const otherTrips = [
        {
            id: '1',
            title: 'Heritage City ...',
            date: 'July 12, 2024 • 09:00 AM',
            bookingId: '#CL-883012',
            image: 'https://images.unsplash.com/photo-1566411711533-6334f2018596?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            confirmed: true
        },
        {
            id: '2',
            title: 'Corporate Re...',
            date: 'Aug 05, 2024 • 08:30 AM',
            bookingId: '#CL-884521',
            image: 'https://images.unsplash.com/photo-1532989623723-d340d8a43f9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            confirmed: true
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
                    onPress={() => setActiveTab('Upcoming')}>
                    <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Past Trips' && styles.activeTab]}
                    onPress={() => setActiveTab('Past Trips')}>
                    <Text style={[styles.tabText, activeTab === 'Past Trips' && styles.activeTabText]}>Past Trips</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'Upcoming' &&
                <View>
                    <Text style={styles.sectionTitle}>NEXT EXPERIENCE</Text>
                    <View style={styles.nextExperienceCard}>
                        <ImageBackground
                            source={{ uri: 'https://images.unsplash.com/photo-1597402518423-72535a0a3a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                            style={styles.cardImage}
                            imageStyle={{ borderRadius: SIZES.radius }}>
                            <View style={styles.imageOverlay}>
                                <View style={styles.confirmedBadge}>
                                    <Text style={styles.confirmedText}>CONFIRMED</Text>
                                </View>
                                <Text style={styles.imageDate}>JUNE 24, 2024 • 14:30</Text>
                                <Text style={styles.imageTitle}>Wedding Shuttle Service</Text>
                            </View>
                        </ImageBackground>
                        <View style={styles.cardDetails}>
                            <View style={styles.detailsRow}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>PICKUP POINT</Text>
                                    <View style={styles.detailContent}>
                                        <Ionicons name="location-sharp" size={24} color={'#00A799'} />
                                        <Text style={styles.detailText}>Grand Plaza Hotel, Suite 4B</Text>
                                    </View>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>VEHICLE TYPE</Text>
                                    <View style={styles.detailContent}>
                                        <Ionicons name="bus" size={24} color={'#00A799'} />
                                        <Text style={styles.detailText}>Premium Executive Coach</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.bottomRow}>
                                <View>
                                    <Text style={styles.detailLabel}>BOOKING ID</Text>
                                    <Text style={styles.bookingId}>#CL - 882941</Text>
                                </View>
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity style={styles.manageButton}>
                                        <Text style={styles.manageButtonText}>Manage</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.ticketButton}>
                                        <Ionicons name="ticket" size={20} color={COLORS.white} />
                                        <Text style={styles.ticketButtonText}>View Ticket</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>OTHER SCHEDULED TRIPS</Text>
                    {otherTrips.map(trip => (
                        <TouchableOpacity key={trip.id} style={styles.tripCard}>
                            <Image source={{ uri: trip.image }} style={styles.tripImage} />
                            <View style={styles.tripDetails}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.tripTitle}>{trip.title} {trip.confirmed && <Text style={styles.tripConfirmed}>Confirmed</Text>}</Text>
                                    <Text style={styles.tripDate}>{trip.date}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                                        <Ionicons name="pricetag" size={12} color={COLORS.gray} />
                                        <Text style={styles.tripBookingId}>{trip.bookingId}</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            }
        </ScrollView>
    );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: SIZES.padding * 2 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, paddingBottom: SIZES.padding },
    headerTitle: { ...FONTS.h2, color: COLORS.black },
    tabContainer: { flexDirection: 'row', backgroundColor: COLORS.lightGray, borderRadius: SIZES.radius, padding: 4, marginVertical: SIZES.padding },
    tab: { flex: 1, paddingVertical: 10, borderRadius: SIZES.radius - 4, alignItems: 'center' },
    activeTab: { backgroundColor: COLORS.white },
    tabText: { ...FONTS.body3, color: COLORS.gray },
    activeTabText: { ...FONTS.h5, color: COLORS.black },
    sectionTitle: { ...FONTS.h5, color: COLORS.gray, marginVertical: SIZES.padding, letterSpacing: 1 },
    nextExperienceCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radius, marginBottom: SIZES.padding * 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    cardImage: { height: 220, justifyContent: 'flex-end' },
    imageOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: SIZES.padding, borderBottomLeftRadius: SIZES.radius, borderBottomRightRadius: SIZES.radius, borderTopLeftRadius: SIZES.radius, borderTopRightRadius: SIZES.radius },
    confirmedBadge: { backgroundColor: '#00A799', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
    confirmedText: { ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' },
    imageDate: { ...FONTS.body4, color: COLORS.white, marginTop: 80 },
    imageTitle: { ...FONTS.h1, color: COLORS.white, fontWeight: 'bold' },
    cardDetails: { padding: SIZES.padding },
    detailsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    detailItem: { flex: 1 },
    detailLabel: { ...FONTS.body5, color: COLORS.gray },
    detailContent: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    detailText: { ...FONTS.h5, color: COLORS.black, marginLeft: 8, flex: 1 },
    separator: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: SIZES.padding },
    bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    bookingId: { ...FONTS.h4, color: COLORS.black, fontWeight: 'bold' },
    buttonRow: { flexDirection: 'row' },
    manageButton: { backgroundColor: COLORS.lightGray, paddingVertical: 12, paddingHorizontal: 20, borderRadius: SIZES.radius, marginRight: 8 },
    manageButtonText: { ...FONTS.h5, color: COLORS.black },
    ticketButton: { flexDirection: 'row', backgroundColor: '#00A799', paddingVertical: 12, paddingHorizontal: 16, borderRadius: SIZES.radius, alignItems: 'center' },
    ticketButtonText: { ...FONTS.h5, color: COLORS.white, marginLeft: 8 },
    tripCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.base, marginBottom: SIZES.base, alignItems: 'center' },
    tripImage: { width: 80, height: 80, borderRadius: SIZES.radius - 4 },
    tripDetails: { flex: 1, flexDirection: 'row', marginLeft: SIZES.base, alignItems: 'center' },
    tripTitle: { ...FONTS.h4, color: COLORS.black },
    tripConfirmed: { ...FONTS.body5, color: '#00A799', fontWeight: 'bold' },
    tripDate: { ...FONTS.body5, color: COLORS.gray, marginVertical: 4 },
    tripBookingId: { ...FONTS.body5, color: COLORS.gray, marginLeft: 4 },
});

export default BookingsScreen;
