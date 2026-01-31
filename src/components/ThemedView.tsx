import { View, ViewProps } from 'react-native';
import { useTheme } from '../theme';

type ThemedViewProps = ViewProps

export function ThemedView({ style, ...props }: ThemedViewProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[{ backgroundColor: colors.background }, style]}
      {...props}
    />
  );
}
