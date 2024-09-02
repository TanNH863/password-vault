import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContextProviders } from './contexts/ContextProviders';
import { LanguageScreen, WelcomeScreen, GetInfoScreen, SignInScreen, PINCodeSetup, FingerprintSetup } from './screens';
import { AddPasswordScreen, MainScreen, SettingScreen } from './screens/main'
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppMainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0377BC',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ContextProviders>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen name="LanguageSelect" component={LanguageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GetInfo" component={GetInfoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PINCodeSetup" component={PINCodeSetup} />
          <Stack.Screen name="FingerprintSetup" component={FingerprintSetup} />
          <Stack.Screen name="MainScreen" component={AppMainScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="AddPasswordScreen" component={AddPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProviders>
  );
}
