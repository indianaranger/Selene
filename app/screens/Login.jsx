// screens/Login.js
import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert('Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
        email: user.email,
        userId: user.uid,
      });

      console.log('User registered:', user.uid);
      alert('Registration successful');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            <Button title="Register" onPress={signUp} />
          </>
        )}
      </KeyboardAvoidingView>
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
});

export default Login;