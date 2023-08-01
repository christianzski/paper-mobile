import { NavigationContainer, useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import React from 'react';
import { useState, createContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { styles } from './Style';

import { AuthContext, Tab, Stack } from './Context'

const Login = require('./pages/Login');
const Landing = require('./pages/Landing');
const Home = require('./pages/Home');
const Search = require('./pages/Search');
const Friends = require('./pages/Friends');

async function authenticate() {
  const response = await fetch('https://www.21-trading.com/api/get-shares', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const json = await response.json();
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  const authContext = {
    signedIn,
    signIn: () => setSignedIn(true),
    signOut: () => setSignedIn(false)
  };

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar
        barStyle={"#000000"}
      />
      <NavigationContainer>

      {(signedIn) ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name == 'Home') {
                  iconName = 'ios-home';
                } else if (route.name == 'Friends') {
                  iconName = 'ios-people';
                } else if (route.name == "Search") {
                  iconName = 'ios-search';
                }
                return <Ionicons name={iconName} size={size} color={color} />

              }, tabBarActiveTintColor: '#22c55e', tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={Home.Screen} />
            <Tab.Screen name="Search" component={Search.Screen} />
            <Tab.Screen name="Friends" component={Friends.Screen} />
          </Tab.Navigator>
        )
          :
          (<Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing.Screen} />
            <Stack.Screen name="Login" component={Login.Screen} />
            <Stack.Screen name="Home" component={Home.Screen} />
          </Stack.Navigator>)}
     
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
