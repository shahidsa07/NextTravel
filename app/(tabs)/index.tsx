
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const HomeScreen = () => {
  const router = useRouter();
  const [from, setFrom] = useState('Malappuram');
  const [to, setTo] = useState('Wayanad');

  const [departureDateRaw, setDepartureDateRaw] = useState('2026-01-10');
  const [returnDateRaw, setReturnDateRaw] = useState('2026-01-13');

  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [showCalendar, setShowCalendar] = useState(false);
  const [dateType, setDateType] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayOfMonth = date.toLocaleDateString('en-US', { day: '2-digit' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${dayOfWeek} - ${dayOfMonth} - ${month}`;
  };

  useEffect(() => {
    setDepartureDate(formatDate(departureDateRaw));
    setReturnDate(formatDate(returnDateRaw));
  }, [departureDateRaw, returnDateRaw]);

  const handleSearch = () => {
    router.push({ pathname: 'search/results', params: { from, to, departureDate, returnDate } });
  };

  const onDayPress = (day) => {
    const newDate = day.dateString;
    if (dateType === 'departure') {
      setDepartureDateRaw(newDate);
      if (new Date(newDate) > new Date(returnDateRaw)) {
        setReturnDateRaw(newDate);
      }
    } else { // 'return'
      setReturnDateRaw(newDate);
    }
    setShowCalendar(false);
  };
  
  const getMarkedDates = () => {
    const marked = {};
    if (!departureDateRaw || !returnDateRaw) {
      return marked;
    }

    const start = new Date(departureDateRaw);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(returnDateRaw);
    end.setUTCHours(0, 0, 0, 0);

    let currentDate = new Date(start);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      const isStart = currentDate.getTime() === start.getTime();
      const isEnd = currentDate.getTime() === end.getTime();
      
      const isSingleDay = departureDateRaw === returnDateRaw;

      marked[dateString] = {
        color: isStart || isEnd ? COLORS.primary : '#E0F2F1',
        textColor: isStart || isEnd ? COLORS.white : COLORS.primary,
        startingDay: isSingleDay ? false : isStart,
        endingDay: isSingleDay ? false : isEnd,
        selected: isSingleDay
      };

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    return marked;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/(tabs)/notification')}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome Back!</Text>
        <Text style={styles.headerSubtitle}>Where do you want to go?</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Ionicons name="bus" size={24} color={COLORS.white} />
            <Text style={[styles.tabText, { color: COLORS.white }]}>Bus/Traveller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="briefcase" size={24} color={COLORS.primary} />
            <Text style={styles.tabText}>Packages</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>From</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Malappuram" placeholderTextColor={COLORS.gray} value={from} onChangeText={setFrom} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>To</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Wayanad" placeholderTextColor={COLORS.gray} value={to} onChangeText={setTo} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Departure</Text>
              <TouchableOpacity onPress={() => { setDateType('departure'); setShowCalendar(true); }}>
                <View style={styles.inputContainer}>
                  <Ionicons name="calendar-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
                  <Text style={styles.input}>{departureDate}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: SIZES.padding }]}>
              <Text style={styles.label}>Return</Text>
              <TouchableOpacity onPress={() => { setDateType('return'); setShowCalendar(true); }}>
                <View style={styles.inputContainer}>
                  <Ionicons name="calendar-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
                  <Text style={styles.input}>{returnDate}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCalendar}
        onRequestClose={() => {
          setShowCalendar(!showCalendar);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Ionicons name="close" size={25} color={COLORS.black} />
            </TouchableOpacity>
            <Calendar
              onDayPress={onDayPress}
              style={{ marginTop: 30 }}
              markingType={'period'}
              markedDates={getMarkedDates()}
              minDate={dateType === 'return' ? departureDateRaw : new Date().toISOString().split('T')[0]}
              theme={{
                selectedDayBackgroundColor: COLORS.primary,
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: COLORS.primary,
                arrowColor: COLORS.primary,
              }}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    paddingBottom: SIZES.padding * 2,
    paddingTop: 100,
  },
  notificationButton: {
    position: 'absolute',
    top: 60,
    right: SIZES.padding,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...FONTS.body3,
    color: COLORS.white,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    margin: SIZES.padding,
    marginTop: -SIZES.padding,
    padding: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.padding,
  },
  tab: {
    alignItems: 'center',
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    minWidth: 120,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body4,
    color: COLORS.black,
    marginTop: SIZES.base / 2,
  },
  form: {},
  inputGroup: {
    marginBottom: SIZES.padding,
  },
  label: {
    ...FONTS.h4,
    marginBottom: SIZES.base,
    color: COLORS.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding / 1.5,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  searchButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    padding: SIZES.padding,
    height: '50%',
  },
  closeButton: {
    position: 'absolute',
    top: SIZES.padding,
    right: SIZES.padding,
    zIndex: 1,
  },
});

export default HomeScreen;
