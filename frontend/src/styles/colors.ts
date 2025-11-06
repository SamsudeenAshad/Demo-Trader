export const colors = {
  // Background colors
  backgroundDark: '#0B0E11',
  backgroundCard: '#1E2329',
  backgroundHover: '#2B3139',
  
  // Primary colors
  primaryYellow: '#F0B90B',
  primaryYellowLight: '#F8D12F',
  primaryYellowDark: '#C89B09',
  
  // Success/Buy (Green)
  successGreen: '#0ECB81',
  successGreenLight: '#2EE19B',
  successGreenDark: '#0BA066',
  
  // Danger/Sell (Red)
  dangerRed: '#F6465D',
  dangerRedLight: '#FF6B80',
  dangerRedDark: '#D63649',
  
  // Text colors
  textPrimary: '#EAECEF',
  textSecondary: '#848E9C',
  textDisabled: '#5E6673',
  
  // Border/Divider
  border: '#2B3139',
  divider: '#2B3139',
  
  // Other
  white: '#FFFFFF',
  lightGray: '#EAECEF',
  mediumGray: '#848E9C',
  darkGray: '#2B3139',
  
  // Chart colors
  chartUp: '#0ECB81',
  chartDown: '#F6465D',
  chartNeutral: '#848E9C',
};

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primaryYellow} 0%, ${colors.primaryYellowDark} 100%)`,
  success: `linear-gradient(135deg, ${colors.successGreen} 0%, ${colors.successGreenDark} 100%)`,
  danger: `linear-gradient(135deg, ${colors.dangerRed} 0%, ${colors.dangerRedDark} 100%)`,
};

export const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.2)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
  large: '0 8px 16px rgba(0, 0, 0, 0.4)',
};
