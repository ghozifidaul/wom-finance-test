import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { useTheme } from '../theme';
import { ThemeToggle } from '../components/ThemeToggle';
import { LogoutButton } from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function HeaderRight() {
  return (
    <View style={styles.headerRight}>
      <ThemeToggle />
      <LogoutButton />
    </View>
  );
}

export function RootNavigator() {
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ 
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'Home',
              headerRight: () => <HeaderRight />,
            }}
          />
          <Stack.Screen 
            name="PostDetail" 
            component={PostDetailScreen}
            options={{ 
              title: 'Post Detail',
              headerRight: () => <HeaderRight />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
