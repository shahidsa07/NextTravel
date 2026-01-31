import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Animated as RNAnimated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Gesture, GestureDetector, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/theme';

interface NotificationItem {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  isNew?: boolean;
  image?: string;
}

interface NotificationData {
  today: NotificationItem[];
  last7Days: NotificationItem[];
}

interface ToastProps {
  message: string;
  onHide: () => void;
}

interface SwipeableNotificationProps {
  children: React.ReactNode;
  onDismiss: () => void;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  notifications: NotificationData;
  styles: any;
  onDismiss: (id: number, section: string) => void;
  onMarkAsRead: (id: number, section: string) => void;
  onMarkAllAsRead: () => void;
}

interface MarkedDate {
  selected: boolean;
  color: string;
  startingDay: boolean;
  endingDay: boolean;
}

interface MarkedDates {
  [key: string]: MarkedDate;
}

const Toast = ({ message, onHide }: ToastProps) => {
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

const SwipeableNotification = ({ children, onDismiss }: SwipeableNotificationProps) => {
    const { COLORS, FONTS, SIZES } = useTheme();
    
    const renderRightActions = (progress: any, dragX: any) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const scale = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
            extrapolate: 'clamp',
        });

        return (
            <RNAnimated.View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: SIZES.padding,
                marginBottom: SIZES.base,
            }}>
                <TouchableOpacity 
                    onPress={onDismiss} 
                    style={{
                        backgroundColor: COLORS.black,
                        width: 80,
                        height: '100%',
                        borderRadius: SIZES.radius,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: COLORS.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    <RNAnimated.View style={{ 
                        transform: [{ translateX: trans }, { scale }],
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="trash-outline" size={20} color={COLORS.white} style={{ marginBottom: 2 }} />
                        <Text style={{
                            ...FONTS.body5,
                            color: COLORS.white,
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>
                            Dismiss
                        </Text>
                    </RNAnimated.View>
                </TouchableOpacity>
            </RNAnimated.View>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={onDismiss}>
            {children}
        </Swipeable>
    );
};

const NotificationModal = ({ visible, onClose, notifications, styles, onDismiss, onMarkAsRead, onMarkAllAsRead }: NotificationModalProps) => {
    const translateY = useSharedValue(0);
    const startY = useSharedValue(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const [scrollOffset, setScrollOffset] = useState(0);
    const totalNotifications = notifications.today.length + notifications.last7Days.length;
    const modalHeight = totalNotifications > 3 ? '90%' : '50%';

    useEffect(() => {
        if (visible) {
            translateY.value = withTiming(0);
            setScrollOffset(0);
        }
    }, [visible, translateY]);

    // Gesture only for the header area (grabber)
    const gesture = Gesture.Pan()
        .onBegin(() => {
            startY.value = translateY.value;
        })
        .onUpdate((event) => {
            // Only allow modal dismissal when scrolled to top AND dragging downward
            if (scrollOffset <= 0 && event.translationY > 0) {
                translateY.value = Math.max(0, startY.value + event.translationY);
            }
        })
        .onEnd(() => {
            if (scrollOffset <= 0 && translateY.value > 100) {
                runOnJS(onClose)();
            } else {
                translateY.value = withTiming(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const handleScroll = (event: any) => {
        setScrollOffset(event.nativeEvent.contentOffset.y);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={styles.modalContainer}>
                    <Animated.View style={[styles.notificationModalContent, { height: modalHeight }, animatedStyle]}>
                        {/* Gesture detector only on the header area */}
                        <GestureDetector gesture={gesture}>
                            <View>
                                <View style={styles.notificationGrabberContainer}>
                                    <View style={styles.notificationGrabber} />
                                </View>
                                <View style={styles.notificationHeader}>
                                    <Text style={styles.notificationTitle}>Notifications</Text>
                                    <TouchableOpacity onPress={onMarkAllAsRead}>
                                        <Text style={styles.notificationMarkAll}>Mark all as read</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </GestureDetector>
                        
                        {/* Separate ScrollView without gesture interference */}
                        <ScrollView
                            ref={scrollViewRef}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        >
                            <Text style={styles.notificationSectionTitle}>TODAY</Text>
                            {notifications.today.map((item: NotificationItem) => (
                                <SwipeableNotification key={item.id} onDismiss={() => onDismiss(item.id, 'today')}>
                                    <TouchableOpacity 
                                        style={styles.notificationItem}
                                        onPress={() => onMarkAsRead(item.id, 'today')}
                                        activeOpacity={0.7}
                                    >
                                        {item.type === 'special_offer' ? (
                                            <ImageBackground source={{ uri: item.image }} style={styles.notificationImage} imageStyle={{ borderRadius: 10 }}>
                                                <View style={styles.notificationOverlay}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Text style={styles.specialOfferTag}>SPECIAL OFFER</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.notificationTimeDark}>{item.time}</Text>
                                                            {item.isNew && <View style={styles.notificationNewDotDark} />}
                                                        </View>
                                                    </View>
                                                    <Text style={styles.notificationSpecialOfferTitle}>{item.title}</Text>
                                                    <Text style={styles.notificationSpecialOfferDescription}>{item.description}</Text>
                                                </View>
                                            </ImageBackground>
                                        ) : (
                                            <View style={[styles.notificationCard, item.type === 'alert' && { backgroundColor: '#E6F6F5' }]}>
                                                <View style={styles.notificationIconContainer}>
                                                    <Ionicons name={item.type === 'alert' ? 'bus-outline' : 'gift-outline'} size={24} color={'#000'} />
                                                </View>
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
                                    </TouchableOpacity>
                                </SwipeableNotification>
                            ))}
                            <Text style={styles.notificationSectionTitle}>LAST 7 DAYS</Text>
                            {notifications.last7Days.map((item: NotificationItem) => (
                                 <SwipeableNotification key={item.id} onDismiss={() => onDismiss(item.id, 'last7Days')}>
                                    <TouchableOpacity 
                                        style={styles.notificationItem}
                                        onPress={() => onMarkAsRead(item.id, 'last7Days')}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[styles.notificationCard, { backgroundColor: '#fff' }]}>
                                            <View style={styles.notificationIconContainer}>
                                                <Ionicons name={'checkmark-circle-outline'} size={24} color={'#000'} />
                                            </View>
                                            <View style={styles.notificationTextContainer}>
                                                <Text style={styles.notificationCardTitle}>{item.title}</Text>
                                                <Text style={styles.notificationCardDescription}>{item.description}</Text>
                                            </View>
                                            <View style={{ alignItems: 'flex-end' }}>
                                                <Text style={styles.notificationTime}>{item.time}</Text>
                                                {item.isNew && <View style={styles.notificationNewDot} />}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </SwipeableNotification>
                            ))}
                        </ScrollView>
                    </Animated.View>
                </View>
            </GestureHandlerRootView>
        </Modal>
    );
};

const initialNotifications: NotificationData = {
    today: [
        { id: 1, type: 'alert', title: 'Your Heritage City Tour is arriving', description: 'Driver Michael is 5 minutes away in a White Mercedes Sprinter (ABC-1234).', time: '2m ago', isNew: true },
        { id: 2, type: 'special_offer', title: 'Book Your Dream Wedding Shuttle', description: 'Save 15% on curated bridal fleet bookings this month.', time: '3h ago', image: 'https://images.unsplash.com/photo-1597402518423-72535a0a3a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: true },
        { id: 3, type: 'reward', title: 'Reward Points Updated', description: 'You\'ve earned 450 points from your last trip. Level up to Gold status soon!', time: '5h ago', isNew: true },
    ],
    last7Days: [
        { id: 4, type: 'booking_confirmed', title: 'Your booking is confirmed', description: 'Your booking for the Heritage City Tour on 24th May has been confirmed.', time: '1d ago', isNew: false },
        { id: 5, type: 'booking_confirmed', title: 'Rate your last trip', description: 'Enjoyed your ride with driver Sarah? Let us know how it went.', time: '3d ago', isNew: false },
        { id: 6, type: 'booking_confirmed', title: 'A new vehicle has been added', description: 'The Classic Rolls Royce is now available for booking in your city.', time: '5d ago', isNew: false },
        { id: 7, type: 'booking_confirmed', title: 'Your account has been secured', description: 'Your password was recently changed. If this wasn\'t you, please secure your account.', time: '7d ago', isNew: false },
    ]
};

const HomeScreen = () => {
    const router = useRouter();
    const { COLORS, FONTS, SIZES } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getStyles(COLORS, FONTS, SIZES);
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [tripDate, setTripDate] = useState<string>('Select Trip Date');
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [markedDates, setMarkedDates] = useState<MarkedDates>({});
    
    // New state for date range selection
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [isSelectingRange, setIsSelectingRange] = useState<boolean>(true);
    
    const calendarRef = useRef<any>(null);
    const [warning, setWarning] = useState<string>('');
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<NotificationData>(initialNotifications);
    const calendarModalTranslateY = useSharedValue(0);
    const calendarModalStartY = useSharedValue(0);

    // Animation for notification indicator ping effect
    const notificationPingScale = useSharedValue(1);
    const notificationPingOpacity = useSharedValue(1);

    // Track if any modal is open to adjust status bar
    const isAnyModalOpen = showCalendar || showNotifications;

    // Check if there are unread notifications
    const hasUnreadNotifications = notifications.today.some(item => item.isNew) || notifications.last7Days.some(item => item.isNew);

    // Start ping animation when there are unread notifications
    useEffect(() => {
        if (hasUnreadNotifications) {
            // Create repeating ping animation
            notificationPingScale.value = withRepeat(
                withTiming(1.5, { duration: 1000 }),
                -1, // infinite repeat
                true // reverse
            );
            notificationPingOpacity.value = withRepeat(
                withTiming(0.3, { duration: 1000 }),
                -1, // infinite repeat
                true // reverse
            );
        } else {
            // Reset animation when no unread notifications
            notificationPingScale.value = withTiming(1, { duration: 300 });
            notificationPingOpacity.value = withTiming(1, { duration: 300 });
        }
    }, [hasUnreadNotifications]);

    // Animated style for the ping effect
    const notificationPingStyle = useAnimatedStyle(() => ({
        transform: [{ scale: notificationPingScale.value }],
        opacity: notificationPingOpacity.value,
    }));

    useEffect(() => {
        if (showCalendar) {
            calendarModalTranslateY.value = withSpring(0);
        }
    }, [showCalendar]);

    const handleDismissNotification = (id: number, section: string) => {
        setNotifications(prev => ({
            ...prev,
            [section]: prev[section as keyof NotificationData].filter((item: NotificationItem) => item.id !== id)
        }));
    };

    // Mark individual notification as read
    const handleMarkAsRead = (id: number, section: string) => {
        setNotifications(prev => ({
            ...prev,
            [section]: prev[section as keyof NotificationData].map((item: NotificationItem) => 
                item.id === id ? { ...item, isNew: false } : item
            )
        }));
    };

    // Mark all notifications as read
    const handleMarkAllAsRead = () => {
        setNotifications(prev => ({
            today: prev.today.map(item => ({ ...item, isNew: false })),
            last7Days: prev.last7Days.map(item => ({ ...item, isNew: false }))
        }));
    };

    const getToday = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const today = getToday();

    const handleSearch = () => {
        if (!from || !to || tripDate === 'Select Trip Date') {
            setWarning('All input fields are required.');
        } else {
            setWarning('');
            router.push({ pathname: '/search/results', params: { from, to, tripDate } });
        }
    };

    // Helper function to generate date range between two dates
    const generateDateRange = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dates: MarkedDates = {};
        
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            const isStart = dateString === start;
            const isEnd = dateString === end;
            const isSingleDay = start === end;
            const isMiddle = !isStart && !isEnd && !isSingleDay;
            
            dates[dateString] = {
                selected: true,
                color: isMiddle ? '#B3E5E0' : '#00A799', // Light color for middle dates, original for start/end
                startingDay: isStart || isSingleDay,
                endingDay: isEnd || isSingleDay,
            };
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return dates;
    };

    const onDayPress = (day: any) => {
        const { dateString } = day;
        
        if (!isSelectingRange) {
            // Single date selection (legacy mode)
            setMarkedDates({ [dateString]: { selected: true, color: '#00A799', startingDay: true, endingDay: true } });
            setStartDate(dateString);
            setEndDate(null);
            return;
        }

        // Date range selection logic
        if (!startDate || (startDate && endDate)) {
            // Start new selection
            setStartDate(dateString);
            setEndDate(null);
            setMarkedDates({ [dateString]: { selected: true, color: '#00A799', startingDay: true, endingDay: true } });
        } else if (startDate && !endDate) {
            // Select end date
            const start = new Date(startDate);
            const selected = new Date(dateString);
            
            if (selected < start) {
                // If selected date is before start date, make it the new start date
                setStartDate(dateString);
                setEndDate(null);
                setMarkedDates({ [dateString]: { selected: true, color: '#00A799', startingDay: true, endingDay: true } });
            } else {
                // Set as end date and generate range
                setEndDate(dateString);
                const rangeMarkedDates = generateDateRange(startDate, dateString);
                setMarkedDates(rangeMarkedDates);
            }
        }
    };

    const getDuration = () => {
        if (!startDate) return 'Please select dates';
        
        if (!endDate || startDate === endDate) {
            return formatDate(startDate);
        }
        
        const start = formatDate(startDate);
        const end = formatDate(endDate);
        const daysBetween = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)) + 1;
        
        return `${start} - ${end} (${daysBetween} day${daysBetween > 1 ? 's' : ''})`;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Select Trip Date';
        const [year, month, day] = dateString.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Use local timezone
        return `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleDateString('en-US', { month: 'short' })}`;
    };

    const applySelection = () => {
        const duration = getDuration();
        setTripDate(duration !== 'Please select dates' ? duration : 'Select Trip Date');
        setShowCalendar(false);
    };

    const clearSelection = () => {
        setMarkedDates({});
        setStartDate(null);
        setEndDate(null);
        setTripDate('Select Trip Date');
    };

    const selectToday = () => {
        const todayStr = getToday();
        setStartDate(todayStr);
        setEndDate(null);
        setMarkedDates({ [todayStr]: { selected: true, color: '#00A799', startingDay: true, endingDay: true } });
        calendarRef.current?.scrollToDay(todayStr, 0, true);
    };

    // Add toggle function for selection mode
    const toggleSelectionMode = () => {
        setIsSelectingRange(!isSelectingRange);
        clearSelection();
    };

    const calendarGesture = Gesture.Pan()
        .onBegin(() => {
            calendarModalStartY.value = calendarModalTranslateY.value;
        })
        .onUpdate((event) => {
            calendarModalTranslateY.value = Math.max(0, calendarModalStartY.value + event.translationY);
        })
        .onEnd(() => {
            if (calendarModalTranslateY.value > 100) {
                runOnJS(setShowCalendar)(false);
            } else {
                calendarModalTranslateY.value = withSpring(0);
            }
        });

    const calendarModalAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: calendarModalTranslateY.value }],
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style={isAnyModalOpen ? "light" : "dark"} />
            {isAnyModalOpen && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: insets.top, // Use actual status bar height
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 999
                }} />
            )}
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
                            <TouchableOpacity onPress={() => setShowNotifications(true)} style={styles.notificationIconContainer}>
                                <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
                                {(notifications.today.some(item => item.isNew) || notifications.last7Days.some(item => item.isNew)) && (
                                    <Animated.View style={[styles.notificationIndicator, notificationPingStyle]} />
                                )}
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
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <View style={styles.modalContainer}>
                            <GestureDetector gesture={calendarGesture}>
                                <Animated.View style={[styles.modalContent, calendarModalAnimatedStyle]}>
                                    <View style={styles.grabberContainer}><View style={styles.grabber} /></View>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Select Trip Date</Text>
                                        <Text style={styles.modalSubtitle}>
                                            {isSelectingRange ? 'Choose start and end dates' : 'Choose a single date'}
                                        </Text>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
                                            <Ionicons name="close" size={25} color={COLORS.black} />
                                        </TouchableOpacity>
                                    </View>
                                    
                                    {/* Selection mode toggle */}
                                    <View style={styles.selectionModeContainer}>
                                        <TouchableOpacity 
                                            style={[styles.modeButton, isSelectingRange && styles.activeModeButton]}
                                            onPress={() => !isSelectingRange && toggleSelectionMode()}
                                        >
                                            <Text style={[styles.modeButtonText, isSelectingRange && styles.activeModeButtonText]}>
                                                Date Range
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.modeButton, !isSelectingRange && styles.activeModeButton]}
                                            onPress={() => isSelectingRange && toggleSelectionMode()}
                                        >
                                            <Text style={[styles.modeButtonText, !isSelectingRange && styles.activeModeButtonText]}>
                                                Single Date
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Calendar 
                                        ref={calendarRef} 
                                        onDayPress={onDayPress} 
                                        style={{ marginTop: 15 }} 
                                        minDate={today} 
                                        markingType={'period'} 
                                        markedDates={markedDates} 
                                        theme={{ 
                                            backgroundColor: COLORS.white, 
                                            calendarBackground: COLORS.white, 
                                            textSectionTitleColor: COLORS.black, 
                                            selectedDayBackgroundColor: '#00A799', 
                                            selectedDayTextColor: '#FFFFFF', 
                                            todayTextColor: '#00A799', 
                                            dayTextColor: COLORS.black, 
                                            textDisabledColor: COLORS.gray, 
                                            dotColor: '#00A799', 
                                            selectedDotColor: COLORS.white, 
                                            arrowColor: '#00A799', 
                                            monthTextColor: COLORS.black 
                                        }} 
                                    />
                                    
                                    <View style={styles.quickSelectionContainer}>
                                        <TouchableOpacity style={styles.quickSelectionButton} onPress={selectToday}>
                                            <Text style={styles.quickSelectionButtonText}>Today</Text>
                                        </TouchableOpacity>
                                        {isSelectingRange && (
                                            <>
                                                <TouchableOpacity style={styles.quickSelectionButton} onPress={() => {
                                                    const today = new Date();
                                                    const tomorrow = new Date();
                                                    tomorrow.setDate(today.getDate() + 1);
                                                    
                                                    // Use local timezone formatting instead of UTC
                                                    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                                                    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
                                                    
                                                    setStartDate(todayStr);
                                                    setEndDate(tomorrowStr);
                                                    setMarkedDates(generateDateRange(todayStr, tomorrowStr));
                                                }}>
                                                    <Text style={styles.quickSelectionButtonText}>2 Days</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.quickSelectionButton} onPress={() => {
                                                    const start = new Date();
                                                    const end = new Date();
                                                    end.setDate(start.getDate() + 6);
                                                    
                                                    // Use local timezone formatting instead of UTC
                                                    const startStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
                                                    const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
                                                    
                                                    setStartDate(startStr);
                                                    setEndDate(endStr);
                                                    setMarkedDates(generateDateRange(startStr, endStr));
                                                }}>
                                                    <Text style={styles.quickSelectionButtonText}>1 Week</Text>
                                                </TouchableOpacity>
                                            </>
                                        )}
                                    </View>
                                    <View style={styles.durationContainer}>
                                        <View>
                                            <Text style={styles.durationLabel}>DURATION</Text>
                                            <Text style={styles.durationText}>{getDuration()}</Text>
                                        </View>
                                        <TouchableOpacity onPress={clearSelection}><Text style={styles.clearSelectionText}>CLEAR SELECTION</Text></TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.applyButton} onPress={applySelection}><Text style={styles.applyButtonText}>Apply Selection</Text></TouchableOpacity>
                                </Animated.View>
                            </GestureDetector>
                        </View>
                    </GestureHandlerRootView>
                </Modal>

                <NotificationModal
                    visible={showNotifications}
                    onClose={() => setShowNotifications(false)}
                    notifications={notifications}
                    styles={styles}
                    onDismiss={handleDismissNotification}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const getStyles = (COLORS: any, FONTS: any, SIZES: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightWhite },
    header: { padding: SIZES.padding, paddingTop: 50, backgroundColor: COLORS.lightWhite },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: SIZES.base },
    welcomeText: { ...FONTS.body5, color: COLORS.gray },
    userName: { ...FONTS.h4, color: COLORS.black },
    title1: { ...FONTS.h1, color: COLORS.black, marginTop: SIZES.padding },
    title2: { ...FONTS.h1, color: '#00A799', fontStyle: 'italic' },
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
    modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: SIZES.radius * 2, borderTopRightRadius: SIZES.radius * 2, padding: SIZES.padding, height: 'auto' },
    modalHeader: { alignItems: 'center', paddingBottom: SIZES.base },
    modalTitle: { ...FONTS.h2, color: COLORS.black },
    modalSubtitle: { ...FONTS.body4, color: COLORS.gray },
    closeButton: { position: 'absolute', top: 0, right: 0, zIndex: 1 },
    quickSelectionContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: SIZES.base },
    quickSelectionButton: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.white, borderRadius: 20, borderWidth: 1, borderColor: COLORS.gray },
    quickSelectionButtonText: { ...FONTS.body4, color: COLORS.black },
    durationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: SIZES.base, paddingHorizontal: SIZES.padding },
    durationLabel: { ...FONTS.body5, color: COLORS.gray },
    durationText: { ...FONTS.h4, color: COLORS.black, marginTop: 4 },
    clearSelectionText: { ...FONTS.h5, color: '#00A799' },
    applyButton: { backgroundColor: '#00A799', borderRadius: SIZES.radius, height: 50, alignItems: 'center', justifyContent: 'center', margin: SIZES.padding },
    applyButtonText: { ...FONTS.h4, color: COLORS.white },
    notificationModalContent: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.white, borderTopLeftRadius: SIZES.radius * 2, borderTopRightRadius: SIZES.radius * 2, padding: SIZES.padding },
    notificationGrabberContainer: { alignItems: 'center', paddingVertical: 10 },
    notificationGrabber: { width: 40, height: 5, backgroundColor: COLORS.gray, borderRadius: 3 },
    grabberContainer: { alignItems: 'center', paddingVertical: 10 },
    grabber: { width: 40, height: 5, backgroundColor: COLORS.gray, borderRadius: 3 },
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
    notificationNewDotDark: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00A799', marginTop: 4, alignSelf: 'center', marginLeft: 8 },
    notificationImage: { width: '100%', height: 150, justifyContent: 'flex-end' },
    notificationOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: SIZES.base, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    specialOfferTag: { ...FONTS.body5, color: '#00A799', backgroundColor: COLORS.white, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, overflow: 'hidden', alignSelf: 'flex-start' },
    notificationSpecialOfferTitle: { ...FONTS.h4, color: COLORS.white, marginTop: SIZES.base },
    notificationSpecialOfferDescription: { ...FONTS.body4, color: COLORS.white, marginTop: 4 },
    selectionModeContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: SIZES.base },
    modeButton: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.white, borderRadius: 20, borderWidth: 1, borderColor: COLORS.gray, marginHorizontal: 5 },
    activeModeButton: { backgroundColor: '#00A799', borderColor: '#00A799' },
    modeButtonText: { ...FONTS.body4, color: COLORS.gray },
    activeModeButtonText: { color: COLORS.white },
    quickSelectionButtonText: { ...FONTS.body4, color: COLORS.black },
    notificationIconContainer: { position: 'relative' },
    notificationIndicator: { position: 'absolute', top: 0, right: 1, width: 10, height: 10, borderRadius: 5, borderColor: '#fff', backgroundColor: '#00A799', borderWidth: 2 },
});

export default HomeScreen;
