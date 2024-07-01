import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageScreen from './screens/LanguageScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import PINCodeSetup from './screens/PINCodeSetup';
import FingerprintSetup from './screens/FingerprintSetup';
import { LanguageProvider } from './components/LanguageContext';

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
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
