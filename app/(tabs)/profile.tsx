'''
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
import { useTheme } from '../../constants/theme';

const ProfileScreen = () => {
    const router = useRouter();
    const { COLORS, FONTS, SIZES } = useTheme();
    const styles = getStyles(COLORS, FONTS, SIZES);

    const menuItems = {
        'ACCOUNT SETTINGS': [
            { icon: 'person-outline', name: 'Personal Information', screen: 'personal-info' },
            { icon: 'card-outline', name: 'Payment Methods', screen: 'payment-methods' },
            { icon: 'time-outline', name: 'Booking History', screen: 'booking-history' },
        ],
        'BENEFITS & PREFERENCES': [
            { icon: 'gift-outline', name: 'Rewards & Coupons', screen: 'rewards', badge: '3 Active' },
            { icon: 'options-outline', name: 'Preferences', screen: 'preferences' },
            { icon: 'notifications-outline', name: 'Notification Settings', screen: 'notification-settings' },
        ],
        'SUPPORT': [
            { icon: 'help-circle-outline', name: 'Help Center', screen: 'help-center' },
            { icon: 'shield-checkmark-outline', name: 'Legal & Privacy', screen: 'legal-privacy' },
        ]
    }

    const handleMenuItemPress = (screen) => {
        // router.push(`/profile/${screen}`);
        console.log(`Navigate to ${screen}`)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.platinumMemberContainer}>
                    <Ionicons name="ribbon-outline" size={16} color={COLORS.secondary} />
                    <Text style={styles.platinumMemberText}>PLATINUM MEMBER</Text>
                </View>
                <Text style={styles.userName}>Alex Johnson</Text>
                <Text style={styles.userEmail}>alex.johnson@example.com</Text>
            </View>

            {Object.keys(menuItems).map(sectionTitle => (
                <View key={sectionTitle} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                    <View style={styles.menuCard}>
                        {menuItems[sectionTitle].map((item, index) => (
                            <TouchableOpacity key={item.name} style={[styles.menuItem, index === menuItems[sectionTitle].length - 1 && styles.lastMenuItem]} onPress={() => handleMenuItemPress(item.screen)}>
                                <Ionicons name={item.icon} size={24} color={COLORS.primary} />
                                <Text style={styles.menuItemText}>{item.name}</Text>
                                {item.badge && <View style={styles.badgeContainer}><Text style={styles.badgeText}>{item.badge}</Text></View>}
                                <Ionicons name="chevron-forward-outline" size={20} color={COLORS.gray} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}

            <TouchableOpacity style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>VERSION 2.4.0</Text>
        </ScrollView>
    );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    header: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding * 2,
        paddingTop: 60,
        alignItems: 'flex-start',
        borderBottomLeftRadius: SIZES.radius * 2,
        borderBottomRightRadius: SIZES.radius * 2,
    },
    platinumMemberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        paddingVertical: SIZES.base / 2,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
    },
    platinumMemberText: {
        ...FONTS.h6,
        color: COLORS.secondary,
        marginLeft: SIZES.base / 2,
    },
    userName: {
        ...FONTS.h1,
        color: COLORS.black,
        marginTop: SIZES.padding,
    },
    userEmail: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginTop: SIZES.base / 2,
    },
    sectionContainer: {
        paddingHorizontal: SIZES.padding * 2,
        marginTop: SIZES.padding * 2,
    },
    sectionTitle: {
        ...FONTS.h5,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    menuCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.base,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuItemText: {
        ...FONTS.body3,
        color: COLORS.black,
        marginLeft: SIZES.padding,
        flex: 1,
    },
    badgeContainer: {
        backgroundColor: '#E6F6F5',
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        paddingVertical: 4,
    },
    badgeText: {
        ...FONTS.body5,
        color: '#00A799',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF0F0',
        margin: SIZES.padding * 2,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    logoutButtonText: {
        ...FONTS.h4,
        color: COLORS.danger,
        marginLeft: SIZES.base,
    },
    versionText: {
        ...FONTS.body5,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: SIZES.padding * 2,
    },
});

export default ProfileScreen;
'''