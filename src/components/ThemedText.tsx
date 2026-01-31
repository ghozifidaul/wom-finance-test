import { Text, TextProps } from 'react-native';
import { useTheme } from '../theme';

type ThemedTextProps = TextProps

export function ThemedText({ style, ...props }: ThemedTextProps) {
  const { colors } = useTheme();

  return (
    <Text
      style={[{ color: colors.text }, style]}
      {...props}
    />
  );
}
