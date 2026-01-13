
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (phone.length !== 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    Alert.alert('OTP Sent', `An OTP has been sent to ${phone}`);
    // In a real app, you would navigate to an OTP verification screen
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NextTravel</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        maxLength={10}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  title: {
    ...FONTS.h1,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
    color: COLORS.primary,
  },
  input: {
    ...FONTS.body3,
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding / 1.5,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});

export default LoginScreen;
