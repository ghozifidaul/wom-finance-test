import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
    </Stack.Navigator>
  );
}
