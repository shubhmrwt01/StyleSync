import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabNavigator } from './TabNavigator';
import AddOutFitScreen from '../screens/AddOutfitScreen';
import DesignRoomScreen from '../screens/DesignRoomScreen';

export default function RootNavigator() {
  const Stack=createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Tabs"component={TabNavigator}/>
      <Stack.Screen name="AddOutfit"component={AddOutFitScreen}/>
      <Stack.Screen name="DesignRoom"component={DesignRoomScreen}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})