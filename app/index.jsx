import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import Login from './screens/Login';
import HomeScreen from './screens/home-screen/HomeScreen';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }} // Adjust as needed
      />
    </InsideStack.Navigator>
  );
}

const App = () => {
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user); // Update user state
    });
    return unsubscribe; // Clean up listener on unmount
  }, []);

  return (
    
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="InsideLayout"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    
  );
};

export default App;
