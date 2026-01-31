export type Theme = 'light' | 'dark';

export interface Colors {
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  icon: string;
}

export const lightColors: Colors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  primary: '#007AFF',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E0E0E0',
  icon: '#000000',
};

export const darkColors: Colors = {
  background: '#000000',
  surface: '#1C1C1E',
  primary: '#0A84FF',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  icon: '#FFFFFF',
};

export const getColors = (theme: Theme): Colors => {
  return theme === 'dark' ? darkColors : lightColors;
};
