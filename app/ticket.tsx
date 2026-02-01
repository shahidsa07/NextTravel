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
                        <View style={styles.ticketTop}>
                            <View style={styles.ticketHeader}>
                                <Text style={styles.confirmedText}>CONFIRMED BOOKING</Text>
                                <Text style={styles.serviceTitle}>Wedding Shuttle Service</Text>
                            </View>
                            <View style={styles.qrCodeContainer}>
                                <Image source={{ uri: 'https://i.imgur.com/g2nArCT.png' }} style={styles.qrCode} />
                                <Text style={styles.bookingId}>CL-882941</Text>
                            </View>
                        </View>

                        <View style={styles.cutoutContainer}>
                            <View style={styles.cutout} />
                            <View style={styles.cutoutLine} />
                            <View style={styles.cutout} />
                        </View>


                        <View style={styles.ticketBottom}>
                            <Text style={styles.tripDetailsTitle}>TRIP DETAILS</Text>

                            <View style={styles.detailRow}>
                                <View style={styles.timeline}>
                                    <View style={styles.timelineDot} />
                                    <View style={styles.timelineConnector} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailLabel}>DEPARTURE</Text>
                                    <Text style={styles.detailValue}>Grand Plaza Hotel</Text>
                                    <Text style={styles.detailSubValue}>Suite 4B Lobby, 1224 Grand Ave, Downtown</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                 <View style={styles.timeline}>
                                    <View style={[styles.timelineDot, {backgroundColor: COLORS.primary}]} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailLabel}>DESTINATION</Text>
                                    <Text style={styles.detailValue}>St. Mary's Cathedral</Text>
                                    <Text style={styles.detailSubValue}>245 Cathedral Hill, North District</Text>
                                </View>
                            </View>

                            <View style={styles.infoRow}>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>TICKET AMOUNT</Text>
                                    <Text style={styles.infoValue}>$450.00</Text>
                                </View>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>PAYMENT STATUS</Text>
                                    <Text style={[styles.infoValue, { color: COLORS.primary }]}><Ionicons name="ellipse" size={10} color={COLORS.primary} /> Paid</Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>DATE & TIME</Text>
                                    <Text style={styles.infoValue}>June 24, 2024 • 14:30</Text>
                                </View>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>VEHICLE</Text>
                                    <Text style={styles.infoValue}>Executive Coach</Text>
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
        padding: SIZES.padding * 1.5,
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
    ticketHeader: {
        alignItems: 'center',
    },
    confirmedText: {
        ...FONTS.body5,
        color: COLORS.primary,
        backgroundColor: '#E6F6F5',
        paddingHorizontal: SIZES.base,
        paddingVertical: 4,
        borderRadius: SIZES.radius,
        overflow: 'hidden',
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    serviceTitle: {
        ...FONTS.h2,
        marginTop: SIZES.base,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    qrCodeContainer: {
        alignItems: 'center',
        marginVertical: SIZES.padding,
    },
    qrCode: {
        width: 160,
        height: 160,
    },
    bookingId: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginTop: SIZES.base,
    },
    cutoutContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    cutout: {
        backgroundColor: '#F3F4F6',
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: -15
    },
    cutoutLine: {
        borderTopWidth: 1,
        borderColor: '#D0D0D0',
        borderStyle: 'dashed',
        width: '90%'
    },
    ticketBottom: {
        padding: SIZES.padding * 1.5,
    },
    tripDetailsTitle: {
        ...FONTS.body5,
        color: COLORS.gray,
        marginBottom: SIZES.padding * 2,
        letterSpacing: 1
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: SIZES.padding * 2,
    },
    timeline: {
        alignItems: 'center',
        width: 20
    },
    timelineDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
    },
    timelineConnector: {
        flex: 1,
        width: 1,
        backgroundColor: COLORS.lightGray,
        marginTop: 4
    },
    detailTextContainer: {
        marginLeft: SIZES.padding,
        flex: 1
    },
    detailLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1
    },
    detailValue: {
        ...FONTS.h5,
        color: COLORS.black,
        marginTop: 2,
        fontWeight: 'bold'
    },
    detailSubValue: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginTop: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
    },
    infoBlock: {
        flex: 0.48
    },
    infoLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        letterSpacing: 1
    },
    infoValue: {
        ...FONTS.h5,
        marginTop: 4,
        fontWeight: '600'
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
});

export default TicketDetailsScreen;
