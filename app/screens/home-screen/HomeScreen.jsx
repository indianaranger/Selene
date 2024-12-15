// screens/home-screen/HomeScreen.jsx
import React from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomAppBar from './components/CustomAppbar';

const HomeScreen = ({navigation}) => {
  const user = FIREBASE_AUTH.currentUser;
  const userId = user.uid;

  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen!</Text>
      {userId ? (
        <Text>Your User ID: {userId}</Text>
      ) : (
        <Text>No User ID found.</Text>
      )}
      <CustomAppBar/>
      <Button 
        title="Go to Screen 1" 
        onPress={() => navigation.navigate('Screen1')}
      />
      <Button 
        title="Go to Screen 2" 
        onPress={() => navigation.navigate('Screen2')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 35, // Distance from the bottom of the screen
    width: 50, // Button width
    height: 50, // Button height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Circular button
    backgroundColor: 'teal', // Button color
    elevation: 5, // Adds a shadow effect
  },
  leftButton: {
    left: '8%', // Positioned slightly to the left of the center
  },
  rightButton: {
    right: '8%', // Positioned slightly to the right of the center
  },
 
});


export default HomeScreen;