// screens/home-screen/_layout.jsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Screen1 from './Screen1';
import Screen2 from './Screen2';

const HomeStack = createNativeStackNavigator();

function HomeStackLayout() {
  return (
    <HomeStack.Navigator initialRouteName="Main">
      <HomeStack.Screen 
        name="Main" 
        component={HomeScreen}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen 
        name="Screen1" 
        component={Screen1}
      />
      <HomeStack.Screen 
        name="Screen2" 
        component={Screen2}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackLayout;