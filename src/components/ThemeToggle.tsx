import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

export function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleTheme}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons
        name={theme === 'dark' ? 'sunny' : 'moon'}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 8,
  },
});
