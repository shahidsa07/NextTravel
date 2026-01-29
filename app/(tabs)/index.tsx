
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../constants/theme';

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

  const getToday = () => {
    const now = new Date();
    const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return localDate.toISOString().split('T')[0];
  };

  const today = getToday();

  const handleSearch = () => {
    router.push({ pathname: 'search/results', params: { from, to, tripDate } });
  };

  const onDayPress = (day) => {
    const { dateString } = day;
    const selectedDates = Object.keys(markedDates).filter(date => markedDates[date].selected);

    let newMarkedDates = { ...markedDates };

    if (selectedDates.length === 1 && new Date(dateString) < new Date(selectedDates[0])) {
        newMarkedDates = {
            [dateString]: { selected: true, color: '#00A799', startingDay: true, endingDay: true }
        };
    } else if (selectedDates.length >= 2) {
        newMarkedDates = {
            [dateString]: { selected: true, color: '#00A799', startingDay: true, endingDay: true }
        };
    } else {
        newMarkedDates[dateString] = { selected: true, color: '#00A799' };
        const selectedKeys = Object.keys(newMarkedDates).filter(key => newMarkedDates[key].selected);

        if (selectedKeys.length === 1) {
            newMarkedDates[dateString] = { ...newMarkedDates[dateString], startingDay: true, endingDay: true };
        } else {
            const [start, end] = selectedKeys.sort();
            const startDate = new Date(start);
            const endDate = new Date(end);

            newMarkedDates = {
                [start]: { startingDay: true, selected: true, color: '#00A799' },
                [end]: { endingDay: true, selected: true, color: '#00A799' }
            };

            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + 1);

            while (currentDate < endDate) {
                const dateStr = currentDate.toISOString().split('T')[0];
                newMarkedDates[dateStr] = { color: '#E6F6F5', textColor: '#00A799', startingDay: false, endingDay: false };
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }

    setMarkedDates(newMarkedDates);
  };

  const getDuration = () => {
    const dates = Object.keys(markedDates).filter(date => markedDates[date].selected);
    if (dates.length === 1) {
      return `${formatDate(dates[0])}`;
    }
    if (dates.length === 2) {
      const [start, end] = dates.sort();
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return `${formatDate(start)} - ${formatDate(end)} (${diffDays} Days)`;
    }
    return 'Please select a date';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Select Trip Date';
    const parts = dateString.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const dayOfMonth = date.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'UTC' });
    const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    return `${dayOfMonth} ${month}`;
  };

  const applySelection = () => {
    const duration = getDuration();
    if (duration && duration !== 'Please select a date') {
        setTripDate(duration);
    } else {
        setTripDate('Select Trip Date');
    }
    setShowCalendar(false);
  };

  const clearSelection = () => {
    setMarkedDates({});
    setTripDate('Select Trip Date');
  };

  const selectToday = () => {
    const today = getToday();
    setMarkedDates({
        [today]: { selected: true, color: '#00A799', startingDay: true, endingDay: true },
    });
    calendarRef.current?.scrollToDay(today, true);
  };

  return (
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
          <TouchableOpacity onPress={() => router.push('/(tabs)/notification')}>
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
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Trip Date</Text>
              <Text style={styles.modalSubtitle}>Choose your journey schedule</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCalendar(false)}
              >
                <Ionicons name="close" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <Calendar
              ref={calendarRef}
              key={today} 
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
                monthTextColor: COLORS.black,
              }}
            />
            <View style={styles.quickSelectionContainer}>
              <TouchableOpacity style={styles.quickSelectionButton} onPress={selectToday}><Text>Today</Text></TouchableOpacity>
            </View>
            <View style={styles.durationContainer}>
                <View>
                    <Text style={styles.durationLabel}>DURATION</Text>
                    <Text style={styles.durationText}>{getDuration()}</Text>
                </View>
                <TouchableOpacity onPress={clearSelection}>
                    <Text style={styles.clearSelectionText}>CLEAR SELECTION</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={applySelection}>
              <Text style={styles.applyButtonText}>Apply Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const getStyles = (COLORS, FONTS, SIZES) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    padding: SIZES.padding,
    paddingTop: 50,
    backgroundColor: COLORS.lightWhite,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.base,
  },
  welcomeText: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  userName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  title1: {
    ...FONTS.h1,
    color: COLORS.black,
    marginTop: SIZES.padding,
  },
  title2: {
    ...FONTS.h1,
    color: '#00A799',
  },
  searchContainer: {
    marginTop: SIZES.padding,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    height: 50,
    marginBottom: SIZES.base,
  },
  inputIcon: {
    marginRight: SIZES.base,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.black,
  },
  placeholderText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    height: 50,
    marginBottom: SIZES.base,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2B40',
    borderRadius: SIZES.radius,
    height: 50,
  },
  exploreButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
    marginLeft: SIZES.base,
  },
  filters: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
  },
  filter: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: 20,
    marginRight: SIZES.base,
  },
  activeFilter: {
    backgroundColor: '#00A799',
  },
  filterText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  specialOccasions: {
    padding: SIZES.padding,
  },
  specialOccasionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specialOccasionsTitle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  specialOccasionsSubtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  viewAll: {
    ...FONTS.h5,
    color: '#00A799',
  },
  occasionCard: {
    marginTop: SIZES.base,
    marginRight: SIZES.base,
  },
  occasionImage: {
    width: 280,
    height: 180,
    borderRadius: SIZES.radius,
  },
  signature: {
    position: 'absolute',
    bottom: SIZES.base,
    left: SIZES.base,
    backgroundColor: '#00A799',
    paddingHorizontal: SIZES.base,
    paddingVertical: 5,
    borderRadius: 5,
  },
  signatureText: {
    ...FONTS.body5,
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
    height: '75%',
  },
  modalHeader: {
    alignItems: 'center',
    paddingBottom: SIZES.base,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  modalSubtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  quickSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SIZES.base,
  },
  quickSelectionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.base,
  },
  durationLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  durationText: {
    ...FONTS.h4,
    color: COLORS.black,
    marginTop: 4,
  },
  clearSelectionText: {
    ...FONTS.h5,
    color: '#00A799',
  },
  applyButton: {
    backgroundColor: '#00A799',
    borderRadius: SIZES.radius,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding
  },
  applyButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});

export default HomeScreen;
