import { useState, createContext } from 'react';
export const AuthContext = createContext();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const Tab = createBottomTabNavigator();
export const Stack = createNativeStackNavigator();