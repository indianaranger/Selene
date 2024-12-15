import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  ActivityIndicator, 
  StyleSheet, 
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

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
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
        email: user.email,
        name: name.trim(),
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
        {!isLogin && (
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Full Name"
            autoCapitalize="words"
            onChangeText={(text) => setName(text)}
          />
        )}
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
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.buttonContainer}>
            <Button 
              title={isLogin ? "Login" : "Create Account"} 
              onPress={isLogin ? signIn : signUp}
            />
            <TouchableOpacity 
              style={styles.switchButton} 
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin 
                  ? "Don't have an account? Create one" 
                  : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
          </View>
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
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default Login;