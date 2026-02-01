import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/theme';

const ProfileScreen = () => {
    const router = useRouter();
    const { COLORS, FONTS, SIZES } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getStyles(COLORS, FONTS, SIZES);

    const menuItems = {
        'ACCOUNT SETTINGS': [
            { icon: 'person-outline', name: 'Personal Information', screen: 'personal-info', subtitle: 'Manage your profile details' },
            { icon: 'card-outline', name: 'Payment Methods', screen: 'payment-methods', subtitle: 'Cards & billing information' },
            { icon: 'time-outline', name: 'Booking History', screen: 'booking-history', subtitle: 'View past journeys' },
        ],
        'BENEFITS & PRIVILEGES': [
            { icon: 'diamond-outline', name: 'Platinum Benefits', screen: 'benefits', subtitle: 'Exclusive member rewards', badge: 'Premium' },
            { icon: 'gift-outline', name: 'Rewards & Offers', screen: 'rewards', subtitle: 'Active promotions', badge: '3 Available' },
            { icon: 'settings-outline', name: 'Preferences', screen: 'preferences', subtitle: 'Customize your experience' },
        ],
        'SUPPORT & ASSISTANCE': [
            { icon: 'headset-outline', name: 'Concierge Service', screen: 'concierge', subtitle: '24/7 premium support' },
            { icon: 'shield-checkmark-outline', name: 'Security & Privacy', screen: 'security', subtitle: 'Account protection' },
            { icon: 'document-text-outline', name: 'Terms & Policies', screen: 'legal', subtitle: 'Legal information' },
        ]
    }

    const handleMenuItemPress = (screen) => {
        // router.push(`/profile/${screen}`);
        console.log(`Navigate to ${screen}`)
    }

    return (
        <View style={styles.container}>
            {/* Fixed Premium Header */}
            <View style={[styles.headerContainer, { paddingTop: insets.top + 20 }]}>
                <View style={styles.headerGradient}>
                    <View style={styles.headerContent}>
                        {/* User Information */}
                        <View style={styles.userInfo}>
                            <View style={styles.platinumBadge}>
                                <Ionicons name="diamond" size={14} color="#00A799" />
                                <Text style={styles.platinumText}>PLATINUM ELITE</Text>
                            </View>
                            <Text style={styles.userName}>Alex Johnson</Text>
                            <Text style={styles.userEmail}>alex.johnson@nexttravel.com</Text>
                            
                            {/* Stats Row */}
                            <View style={styles.statsContainer}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>24</Text>
                                    <Text style={styles.statLabel}>Journeys</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>8,450</Text>
                                    <Text style={styles.statLabel}>Points</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>4.9</Text>
                                    <Text style={styles.statLabel}>Rating</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Scrollable Menu Sections */}
            <ScrollView style={styles.scrollableContent} showsVerticalScrollIndicator={false}>
                <View style={styles.menuContainer}>
                    {Object.keys(menuItems).map(sectionTitle => (
                        <View key={sectionTitle} style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                            <View style={styles.menuCard}>
                                {menuItems[sectionTitle].map((item, index) => (
                                    <TouchableOpacity 
                                        key={item.name} 
                                        style={[
                                            styles.menuItem, 
                                            index === menuItems[sectionTitle].length - 1 && styles.lastMenuItem
                                        ]} 
                                        onPress={() => handleMenuItemPress(item.screen)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.menuIconContainer}>
                                            <Ionicons name={item.icon} size={22} color="#00A799" />
                                        </View>
                                        <View style={styles.menuTextContainer}>
                                            <Text style={styles.menuItemTitle}>{item.name}</Text>
                                            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                                        </View>
                                        {item.badge && (
                                            <View style={styles.badgeContainer}>
                                                <Text style={styles.badgeText}>{item.badge}</Text>
                                            </View>
                                        )}
                                        <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Premium Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.emergencyButton}>
                        <Ionicons name="call" size={20} color="#00A799" />
                        <Text style={styles.emergencyButtonText}>Emergency Support</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.logoutButton}>
                        <Ionicons name="log-out-outline" size={20} color="#FF4757" />
                        <Text style={styles.logoutButtonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footerContainer}>
                    <Text style={styles.versionText}>NextTravel Premium • Version 2.4.0</Text>
                    <Text style={styles.copyrightText}>© 2026 NextTravel. All rights reserved.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 1,
    },
    headerGradient: {
        paddingHorizontal: SIZES.padding * 1.5,
        paddingBottom: SIZES.padding * 1,
    },
    headerContent: {
        alignItems: 'center',
    },
    userInfo: {
        alignItems: 'center',
        width: '100%',
    },
    platinumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F9F8',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0F2F1',
    },
    platinumText: {
        ...FONTS.body5,
        color: '#00A799',
        fontWeight: '700',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    userName: {
        ...FONTS.h2,
        color: COLORS.black,
        fontWeight: '700',
        marginBottom: 2,
    },
    userEmail: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginBottom: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        width: '100%',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        ...FONTS.h3,
        color: COLORS.black,
        fontWeight: '700',
    },
    statLabel: {
        ...FONTS.body5,
        color: COLORS.gray,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 32,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 16,
    },
    scrollableContent: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    menuContainer: {
        paddingHorizontal: SIZES.padding * 1.1,
        paddingTop: SIZES.padding * 1,
    },
    sectionContainer: {
        marginBottom: SIZES.padding * 2,
    },
    sectionTitle: {
        ...FONTS.body4,
        color: COLORS.gray,
        fontWeight: '600',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F0F9F8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuItemTitle: {
        ...FONTS.h5,
        color: COLORS.black,
        fontWeight: '500',
        marginBottom: 2,
    },
    menuItemSubtitle: {
        ...FONTS.body5,
        color: COLORS.gray,
    },
    badgeContainer: {
        backgroundColor: '#F0F9F8',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 12,
    },
    badgeText: {
        ...FONTS.body5,
        color: '#00A799',
        fontWeight: '600',
        fontSize: 11,
    },
    actionsContainer: {
        paddingHorizontal: SIZES.padding * 1.5,
        marginBottom: SIZES.padding,
    },
    emergencyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F9F8',
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0F2F1',
    },
    emergencyButtonText: {
        ...FONTS.body4,
        color: '#00A799',
        fontWeight: '600',
        marginLeft: 8,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF5F5',
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FFE5E5',
    },
    logoutButtonText: {
        ...FONTS.body4,
        color: '#FF4757',
        fontWeight: '600',
        marginLeft: 8,
    },
    footerContainer: {
        alignItems: 'center',
        paddingBottom: SIZES.padding * 3.5,
        paddingHorizontal: SIZES.padding * 1.5,
    },
    versionText: {
        ...FONTS.body5,
        color: COLORS.gray,
        fontWeight: '500',
        marginBottom: 4,
    },
    copyrightText: {
        ...FONTS.body5,
        color: COLORS.gray,
        fontSize: 11,
    },
});

export default ProfileScreen;
