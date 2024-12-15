import React from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomAppBar from './components/CustomAppbar';
import JournalEntryButton from './components/JournalEntryButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const user = FIREBASE_AUTH.currentUser;
  const userId = user?.uid;

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAppBar/>
      
      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Icon name="logout" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.floatingButton, styles.leftButton]}
        onPress={() => navigation.navigate('Calender')}
      >
        <Icon name="event" size={30} color="#fff"/>
      </TouchableOpacity>

      <JournalEntryButton navigation={navigation}/>

      <TouchableOpacity
        style={[styles.floatingButton, styles.rightButton]}
        onPress={() => console.log("Navigate to chatbot")}>
        <Icon name="chat" size={24} color="white" />
      </TouchableOpacity>
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
    bottom: 35,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'teal',
    elevation: 5,
  },
  leftButton: {
    left: '8%',
  },
  rightButton: {
    right: '8%',
  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'teal',
    elevation: 5,
    zIndex: 1,
  },
});

export default HomeScreen;