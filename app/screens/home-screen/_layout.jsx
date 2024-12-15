// screens/home-screen/_layout.jsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Screen2 from './Screen2';
import JournalCalendar from './JournalCalender';

const HomeStack = createNativeStackNavigator();

function HomeStackLayout() {
  return (
    <HomeStack.Navigator initialRouteName="Main">
      <HomeStack.Screen 
        name="Main" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Calender" 
        component={JournalCalendar}
      />
      <HomeStack.Screen 
        name="Screen2" 
        component={Screen2}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackLayout;