import React from 'react';
import ChoosePage from './components/ChoosePage';
import RegisterPage from './components/RegisterPage';
import {StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";

const Stack = createNativeStackNavigator();

export default function App()
{
  return <NavigationContainer>
    <Stack.Navigator initialRouteName={'ChoosePage'} screenOptions={{headerShown: false}}>
      <Stack.Screen name={'ChoosePage'} component={ChoosePage}/>
      <Stack.Screen name={'RegisterPage'} component={RegisterPage}/>
      <Stack.Screen name={'MainPage'} initialParams={213228349} component={MainPage}/>
      <Stack.Screen name={'LoginPage'} component={LoginPage}/>
    </Stack.Navigator>
    <StatusBar translucent backgroundColor={'transparent'}/>
  </NavigationContainer>
}

const firebaseConfig = {
  apiKey: "AIzaSyC4zzzkq2zPPyjwNWzefkRHJkVZCdTL02w",
  authDomain: "newdriver-87c95.firebaseapp.com",
  databaseURL: "https://newdriver-87c95-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "newdriver-87c95",
  storageBucket: "newdriver-87c95.appspot.com",
  messagingSenderId: "1057121439246",
  appId: "1:1057121439246:web:8e14f6a55a1d576c3af65f",
  measurementId: "G-SQ2M3ZTQXJ"
};

initializeApp(firebaseConfig);