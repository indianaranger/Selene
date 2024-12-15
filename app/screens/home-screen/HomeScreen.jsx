// screens/home-screen/HomeScreen.jsx
import React from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native';
import CustomAppBar from './components/CustomAppbar';
import JournalEntryButton from './components/JournalEntryButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const user = FIREBASE_AUTH.currentUser;
  const userId = user.uid;

  return (
    <View style={styles.container}>
      
      <CustomAppBar/>
      <TouchableOpacity
        style={[styles.floatingButton, styles.leftButton]}
        onPress={() => navigation.navigate('Calender')}
      >
        <Icon name="event" size={30} color="#fff"/>
      </TouchableOpacity>
      <JournalEntryButton/>
      <TouchableOpacity
        style={[styles.floatingButton, styles.rightButton]}
        onPress={() => console.log("Navigate to chatbot")}>
         <Icon name="chat" size={24} color="white" />
      </TouchableOpacity>

      {/* <Button 
        title="Go to Screen 1" 
        onPress={() => navigation.navigate('Screen1')}
      />
      <Button 
        title="Go to Screen 2" 
        onPress={() => navigation.navigate('Screen2')}
      /> */}
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