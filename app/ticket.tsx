import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../constants/theme';

const TicketDetailsScreen = () => {
    const router = useRouter();
    const { COLORS, FONTS, SIZES } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getStyles(COLORS, FONTS, SIZES, insets);

    return (
        <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ticket Details</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <Ionicons name="share-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.ticketCard}>
                        {/* Premium Header Section */}
                        <View style={styles.ticketTop}>
                            <View style={styles.statusHeaderSection}>
                                <View style={styles.premiumBadge}>
                                    <Ionicons name="diamond" size={14} color="#00A799" />
                                    <Text style={styles.premiumText}>PLATINUM EXPERIENCE</Text>
                                </View>
                                <View style={styles.confirmedBadgeContainer}>
                                    <View style={styles.statusIndicator} />
                                    <Text style={styles.confirmedText}>CONFIRMED</Text>
                                    <Ionicons name="checkmark-circle" size={16} color="#00A799" />
                                </View>
                            </View>
                            
                            <Text style={styles.serviceTitle}>Wedding Shuttle Service</Text>
                            <Text style={styles.serviceSubtitle}>NextTravel Premium Collection</Text>

                            {/* Premium QR Section */}
                            <View style={styles.qrSection}>
                                <View style={styles.qrFrame}>
                                    <View style={styles.qrCodeFrame}>
                                        <Image source={{ uri: 'https://i.imgur.com/g2nArCT.png' }} style={styles.qrCode} />
                                    </View>
                                    <Text style={styles.scanInstruction}>Present at departure location</Text>
                                </View>
                                
                                <View style={styles.ticketMetaContainer}>
                                    <View style={styles.ticketMetaRow}>
                                        <View style={styles.ticketMetaItem}>
                                            <Text style={styles.ticketMetaLabel}>TICKET NO.</Text>
                                            <Text style={styles.ticketMetaValue}>TK-882941</Text>
                                        </View>
                                        <View style={styles.ticketMetaItem}>
                                            <Text style={styles.ticketMetaLabel}>PNR</Text>
                                            <Text style={styles.ticketMetaValue}>CL882941</Text>
                                        </View>
                                    </View>
                                    <View style={styles.bookingRefContainer}>
                                        <Text style={styles.bookingRefLabel}>BOOKING REFERENCE</Text>
                                        <Text style={styles.bookingRefValue}>#CL-882941</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Luxury Separator */}
                        <View style={styles.luxurySeparator}>
                            <View style={styles.leftCutoutLux} />
                            <View style={styles.separatorLineContainer}>
                                <View style={styles.dottedLine} />
                                <View style={styles.centerDiamond}>
                                    <Ionicons name="diamond" size={12} color="#00A799" />
                                </View>
                                <View style={styles.dottedLine} />
                            </View>
                            <View style={styles.rightCutoutLux} />
                        </View>

                        {/* Journey Details Section */}
                        <View style={styles.ticketBottom}>
                            <View style={styles.sectionHeader}>
                                <Ionicons name="location" size={18} color="#00A799" />
                                <Text style={styles.sectionTitle}>JOURNEY DETAILS</Text>
                            </View>

                            {/* Premium Route Timeline */}
                            <View style={styles.routeContainer}>
                                <View style={styles.routeTimeline}>
                                    <View style={styles.departureSection}>
                                        <View style={styles.timelineDotContainer}>
                                            <View style={styles.timelineDot} />
                                            <View style={styles.timelineConnector} />
                                        </View>
                                        <View style={styles.locationInfo}>
                                            <Text style={styles.locationLabel}>DEPARTURE</Text>
                                            <Text style={styles.locationName}>Grand Plaza Hotel</Text>
                                            <Text style={styles.locationAddress}>Suite 4B Lobby, 1224 Grand Ave</Text>
                                            <View style={styles.timeContainer}>
                                                <Ionicons name="time" size={14} color="#00A799" />
                                                <Text style={styles.timeText}>February 24, 2026 • 14:30</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.destinationSection}>
                                        <View style={styles.timelineDotContainer}>
                                            <View style={[styles.timelineDot, styles.destinationDot]} />
                                        </View>
                                        <View style={styles.locationInfo}>
                                            <Text style={styles.locationLabel}>DESTINATION</Text>
                                            <Text style={styles.locationName}>Rosewood Estate</Text>
                                            <Text style={styles.locationAddress}>456 Garden Valley Road, Main Entrance</Text>
                                            <View style={styles.timeContainer}>
                                                <Ionicons name="time" size={14} color="#00A799" />
                                                <Text style={styles.timeText}>February 24, 2026 • 18:30</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Premium Details Grid */}
                            <View style={styles.premiumDetailsGrid}>
                                <View style={styles.detailCard}>
                                    <View style={styles.detailIconContainer}>
                                        <Ionicons name="people" size={18} color="#00A799" />
                                    </View>
                                    <Text style={styles.detailLabel}>PASSENGERS</Text>
                                    <Text style={styles.detailValue}>12 Guests</Text>
                                    <Text style={styles.detailSubtext}>Wedding Party</Text>
                                </View>

                                <View style={styles.detailCard}>
                                    <View style={styles.detailIconContainer}>
                                        <Ionicons name="car-sport" size={18} color="#00A799" />
                                    </View>
                                    <Text style={styles.detailLabel}>VEHICLE</Text>
                                    <Text style={styles.detailValue}>Executive Coach</Text>
                                    <Text style={styles.detailSubtext}>Premium Class</Text>
                                </View>

                                <View style={styles.detailCard}>
                                    <View style={styles.detailIconContainer}>
                                        <Ionicons name="time" size={18} color="#00A799" />
                                    </View>
                                    <Text style={styles.detailLabel}>DURATION</Text>
                                    <Text style={styles.detailValue}>4 hours</Text>
                                    <Text style={styles.detailSubtext}>Round trip</Text>
                                </View>

                                <View style={styles.detailCard}>
                                    <View style={styles.detailIconContainer}>
                                        <Ionicons name="shield-checkmark" size={18} color="#00A799" />
                                    </View>
                                    <Text style={styles.detailLabel}>INSURANCE</Text>
                                    <Text style={styles.detailValue}>Covered</Text>
                                    <Text style={styles.detailSubtext}>Full Protection</Text>
                                </View>
                            </View>

                            {/* Payment Information */}
                            <View style={styles.paymentSection}>
                                <View style={styles.paymentCard}>
                                    <View style={styles.paymentHeader}>
                                        <Ionicons name="card" size={20} color="#00A799" />
                                        <Text style={styles.paymentTitle}>PAYMENT DETAILS</Text>
                                    </View>
                                    <View style={styles.paymentInfo}>
                                        <View style={styles.paymentItem}>
                                            <Text style={styles.paymentLabel}>Total Amount</Text>
                                            <Text style={styles.paymentValue}>$450.00</Text>
                                        </View>
                                        <View style={styles.paymentStatus}>
                                            <Ionicons name="checkmark-circle" size={16} color="#00A799" />
                                            <Text style={styles.paymentStatusText}>Payment Completed</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.cancelButton}>
                        <Ionicons name="close-circle-outline" size={20} color="#FF4757" />
                        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* Premium Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.downloadButton}>
                    <View style={styles.downloadIconContainer}>
                        <Ionicons name="download" size={16} color="#FFFFFF" />
                    </View>
                    <Text style={styles.downloadButtonText}>Download Ticket</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const getStyles = (COLORS, FONTS, SIZES, insets) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: insets.top + 10,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingBottom: SIZES.base,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8
    },
    headerTitle: {
        ...FONTS.h3,
    },
    backButton: {
        padding: 10,
        marginLeft: -10
    },
    shareButton: {
        padding: 10,
        marginRight: -10
    },
    container: {
        padding: SIZES.padding * 1,
        paddingBottom: 110
    },
    ticketCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius * 2,
        overflow: 'visible',
    },
    ticketTop: {
        padding: SIZES.padding * 1.5,
    },
    statusHeaderSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6F6F5',
        paddingHorizontal: SIZES.base,
        paddingVertical: 4,
        borderRadius: SIZES.radius,
    },
    premiumText: {
        ...FONTS.body5,
        color: '#00A799',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    confirmedBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00A799',
        marginRight: 4,
    },
    confirmedText: {
        ...FONTS.body5,
        color: '#00A799',
        fontWeight: 'bold',
        marginRight: 4,
    },
    serviceTitle: {
        ...FONTS.h2,
        marginTop: SIZES.base,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    serviceSubtitle: {
        ...FONTS.body4,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: 2,
    },
    qrSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZES.padding,
    },
    qrFrame: {
        alignItems: 'center',
    },
    qrCodeFrame: {
        borderWidth: 2,
        borderColor: '#00A799',
        padding: 8,
        borderRadius: 8,
    },
    qrCode: {
        width: 160,
        height: 160,
    },
    scanInstruction: {
        ...FONTS.body5,
        color: COLORS.gray,
        marginTop: 4,
    },
    ticketMetaContainer: {
        flex: 1,
        marginLeft: SIZES.padding,
    },
    ticketMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ticketMetaItem: {
        alignItems: 'center',
    },
    ticketMetaLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1,
    },
    ticketMetaValue: {
        ...FONTS.h5,
        color: COLORS.black,
        fontWeight: 'bold',
        marginTop: 2,
    },
    bookingRefContainer: {
        marginTop: SIZES.base,
        alignItems: 'center',
    },
    bookingRefLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1,
    },
    bookingRefValue: {
        ...FONTS.h5,
        color: COLORS.black,
        fontWeight: 'bold',
        marginTop: 2,
    },
    luxurySeparator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginVertical: SIZES.padding,
    },
    leftCutoutLux: {
        backgroundColor: '#F3F4F6',
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: -15,
    },
    separatorLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dottedLine: {
        borderTopWidth: 1,
        borderColor: '#D0D0D0',
        borderStyle: 'dashed',
        width: '40%',
    },
    centerDiamond: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#00A799',
        marginHorizontal: 8,
    },
    rightCutoutLux: {
        backgroundColor: '#F3F4F6',
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: -15,
    },
    ticketBottom: {
        padding: SIZES.padding * 1.5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    sectionTitle: {
        ...FONTS.h4,
        color: COLORS.black,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    routeContainer: {
        marginBottom: SIZES.padding * 2,
    },
    routeTimeline: {
        flexDirection: 'column',
    },
    departureSection: {
        flexDirection: 'row',
        marginBottom: SIZES.padding * 2,
    },
    timelineDotContainer: {
        alignItems: 'center',
        width: 20,
        marginRight: SIZES.padding,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#00A799',
        backgroundColor: COLORS.white,
        zIndex: 2,
    },
    timelineConnector: {
        position: 'absolute',
        top: 12,
        left: 5,
        width: 2,
        height: 60,
        backgroundColor: '#00A799',
        zIndex: 1,
    },
    locationInfo: {
        flex: 1,
    },
    locationLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1,
    },
    locationName: {
        ...FONTS.h5,
        color: COLORS.black,
        marginTop: 2,
        fontWeight: 'bold',
    },
    locationAddress: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginTop: 2,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    timeText: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginLeft: 4,
    },
    destinationSection: {
        flexDirection: 'row',
    },
    destinationDot: {
        backgroundColor: '#00A799',
        borderColor: '#00A799',
    },
    premiumDetailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZES.padding * 2,
    },
    detailCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailIconContainer: {
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    detailLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        textAlign: 'center',
        letterSpacing: 1,
    },
    detailValue: {
        ...FONTS.h5,
        color: COLORS.black,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 2,
    },
    detailSubtext: {
        ...FONTS.body4,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: 2,
    },
    paymentSection: {
        marginTop: SIZES.padding * 2,
    },
    paymentCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    paymentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    paymentTitle: {
        ...FONTS.h4,
        color: COLORS.black,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    paymentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentItem: {
        alignItems: 'center',
    },
    paymentLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1,
    },
    paymentValue: {
        ...FONTS.h5,
        color: COLORS.black,
        fontWeight: 'bold',
        marginTop: 2,
    },
    paymentStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentStatusText: {
        ...FONTS.body5,
        color: '#00A799',
        fontWeight: 'bold',
        marginLeft: 4,
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
    downloadButton: {
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
    downloadIconContainer: {
        marginRight: SIZES.base,
    },
    downloadButtonText: {
        color: COLORS.white,
        ...FONTS.body4,
        fontWeight: '600',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF5F5',
        paddingVertical: 16,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: '#FFE5E5',
        marginTop: SIZES.padding,
    },
    cancelButtonText: {
        ...FONTS.body4,
        color: '#FF4757',
        fontWeight: '600',
        marginLeft: 8,
    },
    ticketDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.base,
    },
    ticketDetailBlock: {
        alignItems: 'center',
    },
    ticketDetailLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1,
    },
    ticketDetailValue: {
        ...FONTS.h5,
        color: COLORS.black,
        fontWeight: 'bold',
        marginTop: 2,
    },
    additionalDetailsContainer: {
        marginTop: SIZES.padding * 2,
    },
    additionalDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.padding,
    },
    additionalDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.48,
    },
    additionalDetailIcon: {
        marginRight: SIZES.base,
    },
    additionalDetailLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1,
    },
    additionalDetailValue: {
        ...FONTS.h5,
        color: COLORS.black,
        fontWeight: 'bold',
        marginTop: 2,
    },
    routeContainer: {
        marginBottom: SIZES.padding * 2,
    },
    destinationDot: {
        backgroundColor: '#00A799',
        borderColor: '#00A799',
    },
    timeDetail: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginTop: 2,
    },
});

export default TicketDetailsScreen;
