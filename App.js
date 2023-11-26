import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import DetailsMovie from './src/screens/DetailsMovie';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerTitle: 'Pelìculas TMDB',
          headerTitleAlign: 'center',
        }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen options={{
          headerTitle: 'Pelìcula',
          headerTitleAlign: 'center',
        }}
          name="detailsMovie"
          component={DetailsMovie}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
