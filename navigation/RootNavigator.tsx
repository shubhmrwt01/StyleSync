import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabNavigator } from './TabNavigator';

export default function RootNavigator() {
  const Stack=createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Tabs"component={TabNavigator}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})