import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContextProviders } from './components/ContextProviders';
import LanguageScreen from './screens/LanguageScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import PINCodeSetup from './screens/PINCodeSetup';
import FingerprintSetup from './screens/FingerprintSetup';
import AddPasswordScreen from './screens/main/AddPasswordScreen';
import MainScreen from './screens/main/MainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ContextProviders>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen name="LanguageSelect" component={LanguageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PINCodeSetup" component={PINCodeSetup} />
          <Stack.Screen name="FingerprintSetup" component={FingerprintSetup} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="AddPasswordScreen" component={AddPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProviders>
  );
}
