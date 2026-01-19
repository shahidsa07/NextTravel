
import React, { createContext, useContext } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#3498db',
  secondary: '#2ecc71',
  accent: '#D4AF37',

  success: '#2ecc71',
  error: '#e74c3c',

  black: '#171717',
  white: '#FFFFFF',
  background: '#F4F4F4',
  gray: '#a9a9a9',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  width,
  height,
};

export const FONTS = {
  h1: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  body1: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body4, lineHeight: 22 },
  body5: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 18 },
};

const appTheme = { COLORS, SIZES, FONTS };

const ThemeContext = createContext(appTheme);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={appTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
}

export default appTheme;
