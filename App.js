import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';
import { useState, createContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

const Login = require('./apps/LoginScreen');
const Landing = require('./apps/LandingScreen');
const Home = require('./apps/HomeScreen');
const Search = require('./apps/SearchScreen');
const Friend = require('./apps/FriendScreen')

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

export const AuthContext = createContext();

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
            <Tab.Screen name="Home" component={Home.screen} />
            <Tab.Screen name="Search" component={Search.screen} />
            <Tab.Screen name="Friends" component={Friend.screen} />
          </Tab.Navigator>
        )
          :
          (<Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing.screen} />
            <Stack.Screen name="Login" component={Login.screen} />
            <Stack.Screen name="Home" component={Home.screen} />
          </Stack.Navigator>)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1, borderColor: "#1e293b", width: 300,
    padding: 4,
  },

  logo: {
    width: 200, height: 50,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
});
