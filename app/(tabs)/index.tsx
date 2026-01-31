import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated as RNAnimated,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Gesture, GestureDetector, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../constants/theme';

const Toast = ({ message, onHide }) => {
    const opacity = useRef(new RNAnimated.Value(0)).current;

    useEffect(() => {
        RNAnimated.sequence([
            RNAnimated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            RNAnimated.delay(2000),
            RNAnimated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onHide();
        });
    }, [onHide]);

    return (
        <RNAnimated.View
            style={{
                opacity,
                position: 'absolute',
                bottom: 20,
                left: 0,
                right: 0,
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <View style={{ backgroundColor: 'black', padding: 16, borderRadius: 8 }}>
                <Text style={{ color: 'white' }}>{message}</Text>
            </View>
        </RNAnimated.View>
    );
};

const SwipeableNotification = ({ children, onDismiss }) => {
    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [0, 80],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity onPress={onDismiss} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4136', width: 80, borderRadius: 10 }}>
                <RNAnimated.View style={{ transform: [{ translateX: trans }] }}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>Dismiss</Text>
                </RNAnimated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={onDismiss}>
            {children}
        </Swipeable>
    );
};


const NotificationModal = ({ visible, onClose, notifications, styles, onDismiss }) => {
    const translateY = useSharedValue(0);
    const startY = useSharedValue(0);
    const totalNotifications = notifications.today.length + notifications.last7Days.length;
    const modalHeight = totalNotifications > 3 ? '90%' : '50%';

    useEffect(() => {
        if (visible) {
            translateY.value = withSpring(0, { damping: 15 });
        }
    }, [visible, translateY]);

    const gesture = Gesture.Pan()
        .onBegin(() => {
            startY.value = translateY.value;
        })
        .onUpdate((event) => {
            translateY.value = Math.max(0, startY.value + event.translationY);
        })
        .onEnd(() => {
            if (translateY.value > 100) {
                runOnJS(onClose)();
            } else {
                translateY.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={styles.modalContainer}>
                    <GestureDetector gesture={gesture}>
                        <Animated.View style={[styles.notificationModalContent, { height: modalHeight }, animatedStyle]}>
                            <View style={styles.notificationGrabberContainer}><View style={styles.notificationGrabber} /></View>
                            <View style={styles.notificationHeader}>
                                <Text style={styles.notificationTitle}>Notifications</Text>
                                <TouchableOpacity><Text style={styles.notificationMarkAll}>Mark all as read</Text></TouchableOpacity>
                            </View>
                            <ScrollView>
                                <Text style={styles.notificationSectionTitle}>TODAY</Text>
                                {notifications.today.map(item => (
                                    <SwipeableNotification key={item.id} onDismiss={() => onDismiss(item.id, 'today')}>
                                        <View style={styles.notificationItem}>
                                            {item.type === 'special_offer' ? (
                                                <ImageBackground source={{ uri: item.image }} style={styles.notificationImage} imageStyle={{ borderRadius: 10 }}>
                                                    <View style={styles.notificationOverlay}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.specialOfferTag}>SPECIAL OFFER</Text>
                                                            <Text style={styles.notificationTimeDark}>{item.time}</Text>
                                                        </View>
                                                        <Text style={styles.notificationSpecialOfferTitle}>{item.title}</Text>
                                                        <Text style={styles.notificationSpecialOfferDescription}>{item.description}</Text>
                                                    </View>
                                                </ImageBackground>
                                            ) : (
                                                <View style={[styles.notificationCard, item.type === 'alert' && { backgroundColor: '#E6F6F5' }]}>
                                                    <View style={styles.notificationIconContainer}><Ionicons name={item.type === 'alert' ? 'bus-outline' : 'gift-outline'} size={24} color={'#000'} /></View>
                                                    <View style={styles.notificationTextContainer}>
                                                        <Text style={styles.notificationCardTitle}>{item.title}</Text>
                                                        <Text style={styles.notificationCardDescription}>{item.description}</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'flex-end' }}>
                                                        <Text style={styles.notificationTime}>{item.time}</Text>
                                                        {item.isNew && <View style={styles.notificationNewDot} />}
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    </SwipeableNotification>
                                ))}
                                <Text style={styles.notificationSectionTitle}>LAST 7 DAYS</Text>
                                {notifications.last7Days.map(item => (
                                     <SwipeableNotification key={item.id} onDismiss={() => onDismiss(item.id, 'last7Days')}>
                                        <View style={styles.notificationItem}>
                                            <View style={[styles.notificationCard, { backgroundColor: '#fff' }]}>
                                                <View style={styles.notificationIconContainer}><Ionicons name={'checkmark-circle-outline'} size={24} color={'#000'} /></View>
                                                <View style={styles.notificationTextContainer}>
                                                    <Text style={styles.notificationCardTitle}>{item.title}</Text>
                                                    <Text style={styles.notificationCardDescription}>{item.description}</Text>
                                                </View>
                                                <Text style={styles.notificationTime}>{item.time}</Text>
                                            </View>
                                        </View>
                                    </SwipeableNotification>
                                ))}
                            </ScrollView>
                        </Animated.View>
                    </GestureDetector>
                </View>
            </GestureHandlerRootView>
        </Modal>
    );
};

const initialNotifications = {
    today: [
        { id: 1, type: 'alert', title: 'Your Heritage City Tour is arriving', description: 'Driver Michael is 5 minutes away in a White Mercedes Sprinter (ABC-1234).', time: '2m ago', isNew: true },
        { id: 2, type: 'special_offer', title: 'Book Your Dream Wedding Shuttle', description: 'Save 15% on curated bridal fleet bookings this month.', time: '3h ago', image: 'https://images.unsplash.com/photo-1597402518423-72535a0a3a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: true },
        { id: 3, type: 'reward', title: 'Reward Points Updated', description: "You've earned 450 points from your last trip. Level up to Gold status soon!", time: '5h ago', isNew: true },
    ],
    last7Days: [
        { id: 4, type: 'booking_confirmed', title: 'Your booking is confirmed', description: 'Your booking for the Heritage City Tour on 24th May has been confirmed.', time: '1d ago', isNew: false },
        { id: 5, type: 'booking_confirmed', title: 'Rate your last trip', description: 'Enjoyed your ride with driver Sarah? Let us know how it went.', time: '3d ago', isNew: false },
        { id: 6, type: 'booking_confirmed', title: 'A new vehicle has been added', description: 'The Classic Rolls Royce is now available for booking in your city.', time: '5d ago', isNew: false },
        { id: 7, type: 'booking_confirmed', title: 'Your account has been secured', description: 'Your password was recently changed. If this wasn't you, please secure your account.', time: '7d ago', isNew: false },
    ]
};

const HomeScreen = () => {
    const router = useRouter();
    const { COLORS, FONTS, SIZES } = useTheme();
    const styles = getStyles(COLORS, FONTS, SIZES);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [tripDate, setTripDate] = useState('Select Trip Date');
    const [showCalendar, setShowCalendar] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const calendarRef = useRef(null);
    const [warning, setWarning] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleDismissNotification = (id, section) => {
        setNotifications(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const getToday = () => new Date().toISOString().split('T')[0];
    const today = getToday();

    const handleSearch = () => {
        if (!from || !to || tripDate === 'Select Trip Date') {
            setWarning('All input fields are required.');
        } else {
            setWarning('');
            router.push({ pathname: 'search/results', params: { from, to, tripDate } });
        }
    };

    const onDayPress = (day) => {
        const { dateString } = day;
        setMarkedDates({ [dateString]: { selected: true, color: '#00A799', startingDay: true, endingDay: true } });
    };

    const getDuration = () => {
        const dates = Object.keys(markedDates).filter(date => markedDates[date].selected);
        if (dates.length > 0) return formatDate(dates[0]);
        return 'Please select a date';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Select Trip Date';
        const date = new Date(dateString + 'T00:00:00'); // Ensure UTC
        return `${date.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'UTC' })} ${date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}`;
    };

    const applySelection = () => {
        const duration = getDuration();
        setTripDate(duration !== 'Please select a date' ? duration : 'Select Trip Date');
        setShowCalendar(false);
    };

    const clearSelection = () => {
        setMarkedDates({});
        setTripDate('Select Trip Date');
    };

    const selectToday = () => {
        const todayStr = getToday();
        setMarkedDates({ [todayStr]: { selected: true, color: '#00A799', startingDay: true, endingDay: true } });
        calendarRef.current?.scrollToDay(todayStr, 0, true);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <View style={styles.userInfo}>
                                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
                                <View>
                                    <Text style={styles.welcomeText}>WELCOME</Text>
                                    <Text style={styles.userName}>Alex Johnson</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setShowNotifications(true)}>
                                <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title1}>Exquisite Journeys</Text>
                        <Text style={styles.title2}>Awaits Your Presence</Text>
                        <View style={styles.searchContainer}>
                            <View style={styles.inputContainer}>
                                <Ionicons name="location-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
                                <TextInput style={styles.input} placeholder="From where?" placeholderTextColor={COLORS.gray} value={from} onChangeText={setFrom} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Ionicons name="location-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
                                <TextInput style={styles.input} placeholder="Where would you like to go?" placeholderTextColor={COLORS.gray} value={to} onChangeText={setTo} />
                            </View>
                            <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.datePickerContainer}>
                                <Ionicons name="calendar-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
                                <Text style={[styles.input, tripDate === 'Select Trip Date' && styles.placeholderText]}>{tripDate}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.exploreButton} onPress={handleSearch}>
                                <Ionicons name="search-outline" size={24} color={COLORS.white} />
                                <Text style={styles.exploreButtonText}>Explore</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filters}>
                            <TouchableOpacity style={[styles.filter, styles.activeFilter]}>
                                <Text style={[styles.filterText, styles.activeFilterText]}>All Experiences</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filter}>
                                <Text style={styles.filterText}>Weddings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filter}>
                                <Text style={styles.filterText}>Corporate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specialOccasions}>
                        <View style={styles.specialOccasionsHeader}>
                            <View>
                                <Text style={styles.specialOccasionsTitle}>Special Occasions</Text>
                                <Text style={styles.specialOccasionsSubtitle}>Tailored for your most precious moments</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.viewAll}>VIEW ALL</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.occasionCard}>
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1597402518423-72535a0a3a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.occasionImage} />
                                <View style={styles.signature}><Text style={styles.signatureText}>SIGNATURE</Text></View>
                            </View>
                            <View style={styles.occasionCard}>
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1525095368449-763452da67e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.occasionImage} />
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>

                {warning ? <Toast message={warning} onHide={() => setWarning('')} /> : null}

                <Modal animationType="slide" transparent={true} visible={showCalendar} onRequestClose={() => setShowCalendar(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select Trip Date</Text>
                                <Text style={styles.modalSubtitle}>Choose your journey schedule</Text>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
                                    <Ionicons name="close" size={25} color={COLORS.black} />
                                </TouchableOpacity>
                            </View>
                            <Calendar ref={calendarRef} onDayPress={onDayPress} style={{ marginTop: 15 }} minDate={today} markingType={'period'} markedDates={markedDates} theme={{ backgroundColor: COLORS.white, calendarBackground: COLORS.white, textSectionTitleColor: COLORS.black, selectedDayBackgroundColor: '#00A799', selectedDayTextColor: '#FFFFFF', todayTextColor: '#00A799', dayTextColor: COLORS.black, textDisabledColor: COLORS.gray, dotColor: '#00A799', selectedDotColor: COLORS.white, arrowColor: '#00A799', monthTextColor: COLORS.black }} />
                            <View style={styles.quickSelectionContainer}>
                                <TouchableOpacity style={styles.quickSelectionButton} onPress={selectToday}><Text>Today</Text></TouchableOpacity>
                            </View>
                            <View style={styles.durationContainer}>
                                <View>
                                    <Text style={styles.durationLabel}>DURATION</Text>
                                    <Text style={styles.durationText}>{getDuration()}</Text>
                                </View>
                                <TouchableOpacity onPress={clearSelection}><Text style={styles.clearSelectionText}>CLEAR SELECTION</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.applyButton} onPress={applySelection}><Text style={styles.applyButtonText}>Apply Selection</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <NotificationModal
                    visible={showNotifications}
                    onClose={() => setShowNotifications(false)}
                    notifications={notifications}
                    styles={styles}
                    onDismiss={handleDismissNotification}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightWhite },
    header: { padding: SIZES.padding, paddingTop: 50, backgroundColor: COLORS.lightWhite },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: SIZES.base },
    welcomeText: { ...FONTS.body5, color: COLORS.gray },
    userName: { ...FONTS.h4, color: COLORS.black },
    title1: { ...FONTS.h1, color: COLORS.black, marginTop: SIZES.padding },
    title2: { ...FONTS.h1, color: '#00A799' },
    searchContainer: { marginTop: SIZES.padding },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radius, paddingHorizontal: SIZES.padding, height: 50, marginBottom: SIZES.base },
    inputIcon: { marginRight: SIZES.base },
    input: { flex: 1, ...FONTS.body3, color: COLORS.black },
    placeholderText: { ...FONTS.body4, color: COLORS.gray },
    datePickerContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radius, paddingHorizontal: SIZES.padding, height: 50, marginBottom: SIZES.base },
    exploreButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A2B40', borderRadius: SIZES.radius, height: 50 },
    exploreButtonText: { ...FONTS.h4, color: COLORS.white, marginLeft: SIZES.base },
    filters: { flexDirection: 'row', marginTop: SIZES.padding },
    filter: { backgroundColor: COLORS.white, paddingVertical: SIZES.base, paddingHorizontal: SIZES.padding, borderRadius: 20, marginRight: SIZES.base },
    activeFilter: { backgroundColor: '#00A799' },
    filterText: { ...FONTS.body4, color: COLORS.gray },
    activeFilterText: { color: COLORS.white },
    specialOccasions: { padding: SIZES.padding },
    specialOccasionsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    specialOccasionsTitle: { ...FONTS.h3, color: COLORS.black },
    specialOccasionsSubtitle: { ...FONTS.body4, color: COLORS.gray },
    viewAll: { ...FONTS.h5, color: '#00A799' },
    occasionCard: { marginTop: SIZES.base, marginRight: SIZES.base },
    occasionImage: { width: 280, height: 180, borderRadius: SIZES.radius },
    signature: { position: 'absolute', bottom: SIZES.base, left: SIZES.base, backgroundColor: '#00A799', paddingHorizontal: SIZES.base, paddingVertical: 5, borderRadius: 5 },
    signatureText: { ...FONTS.body5, color: COLORS.white },
    modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: SIZES.radius * 2, borderTopRightRadius: SIZES.radius * 2, padding: SIZES.padding, height: '90%' },
    modalHeader: { alignItems: 'center', paddingBottom: SIZES.base },
    modalTitle: { ...FONTS.h2, color: COLORS.black },
    modalSubtitle: { ...FONTS.body4, color: COLORS.gray },
    closeButton: { position: 'absolute', top: 0, right: 0, zIndex: 1 },
    quickSelectionContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: SIZES.base },
    quickSelectionButton: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.white, borderRadius: 20, borderWidth: 1, borderColor: COLORS.gray },
    durationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: SIZES.base, paddingHorizontal: SIZES.padding },
    durationLabel: { ...FONTS.body5, color: COLORS.gray },
    durationText: { ...FONTS.h4, color: COLORS.black, marginTop: 4 },
    clearSelectionText: { ...FONTS.h5, color: '#00A799' },
    applyButton: { backgroundColor: '#00A799', borderRadius: SIZES.radius, height: 50, alignItems: 'center', justifyContent: 'center', margin: SIZES.padding },
    applyButtonText: { ...FONTS.h4, color: COLORS.white },
    notificationModalContent: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.white, borderTopLeftRadius: SIZES.radius * 2, borderTopRightRadius: SIZES.radius * 2, padding: SIZES.padding },
    notificationGrabberContainer: { alignItems: 'center', paddingVertical: 10 },
    notificationGrabber: { width: 40, height: 5, backgroundColor: COLORS.gray, borderRadius: 3 },
    notificationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.padding },
    notificationTitle: { ...FONTS.h2, color: COLORS.black },
    notificationMarkAll: { ...FONTS.h5, color: '#00A799' },
    notificationSectionTitle: { ...FONTS.h5, color: COLORS.gray, marginVertical: SIZES.base },
    notificationItem: { marginBottom: SIZES.base, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' },
    notificationCard: { flexDirection: 'row', alignItems: 'center', padding: SIZES.base, borderRadius: SIZES.radius },
    notificationIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginRight: SIZES.base },
    notificationTextContainer: { flex: 1 },
    notificationCardTitle: { ...FONTS.h5, color: COLORS.black },
    notificationCardDescription: { ...FONTS.body5, color: COLORS.gray },
    notificationTime: { ...FONTS.body5, color: COLORS.gray, marginLeft: SIZES.base },
    notificationTimeDark: { ...FONTS.body5, color: COLORS.lightGray, marginLeft: SIZES.base },
    notificationNewDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00A799', marginTop: 4, alignSelf: 'center', marginLeft: 'auto' },
    notificationImage: { width: '100%', height: 150, justifyContent: 'flex-end' },
    notificationOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: SIZES.base, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    specialOfferTag: { ...FONTS.body5, color: '#00A799', backgroundColor: COLORS.white, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, overflow: 'hidden', alignSelf: 'flex-start' },
    notificationSpecialOfferTitle: { ...FONTS.h4, color: COLORS.white, marginTop: SIZES.base },
    notificationSpecialOfferDescription: { ...FONTS.body4, color: COLORS.white, marginTop: 4 },
});

export default HomeScreen;
