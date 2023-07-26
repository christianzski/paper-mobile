import { NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Image, Button, ScrollView, SafeAreaView, View } from 'react-native';

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

const LandingScreen = ({navigation}) => {
  const navigate = () => {
    navigation.replace('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} src={"https://www.21-trading.com/21-Trading.png"}/>
      <Text style={{marginBottom: 50}}>A Paper Trading Platform</Text>
      <Text>Login to your account to get started!</Text>
      <Button color="#10b981" onPress={navigate} title="Login"/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const LoginScreen = ({navigation}) => {
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  function Login() {
    fetch('https://www.21-trading.com/api/Login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        login: username,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(async (response) => {
      console.log(response);
      if(response.message != "Success") {
        setError("Invalid username or password.");
      } else {
        navigation.replace('Home');
        signIn();
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} src={"https://www.21-trading.com/21-Trading.png"}/>
      <Text style={{marginBottom: 50}}>A Paper Trading Platform</Text>

      <View>
      <Text style={{fontSize: 10}}>Username</Text>
      <TextInput style={styles.input} onChangeText={setUsername}
      placeholder={"Enter a username..."}/>
      </View>

      <View style={{marginTop: 32}}>
      <Text style={{fontSize: 10}}>Password</Text>
      <TextInput secureTextEntry={true} onChangeText={setPassword}
      style={styles.input} placeholder={"Enter a password..."}/>
      </View>


      <Button color="#10b981" onPress={Login} title="Login"/>
      <Text style={{color: "#dc2626"}}>{error}</Text>
    </View>
  );
}

const HomeScreen = () => {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    fetch('https://www.21-trading.com/api/get-shares', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(async (response) => {
      if(response.portfolio) {
        setShares(response.portfolio);
      }
    }).catch(error => {});
  }, []);

  return (
    <View>
      {shares.map((share) => {
        return (
          <View style={{borderColor: "#475569", margin: 8, borderRadius: 5, borderWidth: 1}}>
          <Text style={{backgroundColor: "#10b981", fontSize: 20}}>{share.symbol}:</Text>
          <Text style={{fontSize: 14}}>{share.shares} shares owned</Text>
          <Text>{share.price} average price</Text>
          <Text>{share.sharePrice} current price</Text>
          </View>
        );
      })}
    </View>
  );
}

const SearchScreen = () => {
  const [search, setSearch] = React.useState("");
  const [companies, setCompanies] = React.useState([]);

  useEffect(() => {
    fetch('https://www.21-trading.com/search/' + search.toUpperCase(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(async (response) => {
      setCompanies(response);
    }).catch(error => {});
  }, [search]);

  return (
    <View style={styles.container}>
      <View>
      <Text style={{fontSize: 10}}>Search</Text>
      <TextInput style={styles.input} onChangeText={setSearch}
      placeholder={"Search for companies"}/>
      </View>

      <ScrollView style={{width: "100%", marginTop: 32}}>
        {companies.map((stock) => {
          return (
            <View style={{borderColor: "#475569", margin: 8, borderRadius: 5, borderWidth: 1}}>
            <Text style={{backgroundColor: "#10b981", fontSize: 20}}>{stock["Symbol"]}</Text>
            <Text style={{fontSize: 20}}>{stock["Company Name"]}</Text>
            <Text style={{fontSize: 16}}>{stock["Industry"]}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const FriendScreen = () => {
  return (
    <View>
      <Text>Friends Screen!</Text>
    </View>
  );
}

const AuthContext = createContext();

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  const authContext = {
    signedIn,
    signIn: () => setSignedIn(true),
    signOut: () => setSignedOut(true)
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
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            if(route.name == 'Home') {
              iconName = 'ios-home';
            } else if(route.name == 'Friends') {
              iconName = 'ios-people';
            } else if(route.name == "Search") {
              iconName = 'ios-search';
            }
            return <Ionicons name={iconName} size={size} color={color}/>

          }, tabBarActiveTintColor: '#22c55e', tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Friends" component={FriendScreen} />
        </Tab.Navigator>
      )
      :
      (<Stack.Navigator>
        <Stack.Screen name = "Landing" component={LandingScreen}/>
        <Stack.Screen name = "Login" component={LoginScreen}/>
        <Stack.Screen name = "Home" component={HomeScreen}/>
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
