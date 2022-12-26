import React from 'react';
import ChoosePage from './components/ChoosePage';
import RegisterPage from './components/RegisterPage';
import {StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App()
{
  return <NavigationContainer>
    <Stack.Navigator initialRouteName={'ChoosePage'} screenOptions={{headerShown: false}}>
      <Stack.Screen name={'ChoosePage'} component={ChoosePage}/>
      <Stack.Screen name={'RegisterPage'} component={RegisterPage}/>
    </Stack.Navigator>
    <StatusBar translucent backgroundColor={'transparent'}/>
  </NavigationContainer>
}