import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './components/LanguageContext';
import LanguageScreen from './screens/LanguageScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import PINCodeSetup from './screens/PINCodeSetup';
import FingerprintSetup from './screens/FingerprintSetup';
import MainScreen from './screens/main/MainScreen';
import AddPasswordScreen from './screens/main/AddPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LanguageSelect">
          <Stack.Screen name="LanguageSelect" component={LanguageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PINCodeSetup" component={PINCodeSetup} />
          <Stack.Screen name="FingerprintSetup" component={FingerprintSetup} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddPasswordScreen" component={AddPasswordScreen} options={{ title: 'Add Password' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
