import React from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const user = FIREBASE_AUTH.currentUser; // This gives you access to the current user
  const userId = user.uid;
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen!</Text>
      {userId ? (
        <Text>Your User ID: {userId}</Text>  // Display userId
      ) : (
        <Text>No User ID found.</Text>  // Handle case where userId isn't passed
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default HomeScreen;
