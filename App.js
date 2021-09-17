import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Image, Text, StyleSheet } from 'react-native';
import pexelsLogo from './assets/pexels.png'

import HomeScreen from './screens/HomeScreens';
import ImageScreen from './screens/ImageScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [opemSearch, setopemSearch] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='HomeScreen' 
        
          options={{
            headerLeft: () => <Image source={pexelsLogo} style={styles.logo} />,
            headerRight: () => (
              <Text style={{color:'white', fontSize:18}}
                onPress={()=> setopemSearch(!opemSearch)}
              >{opemSearch ? 'close' : 'Search'}</Text>
            ),
            title: "Pexels App",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: "#000"
            }
          }}
        >
          {(props) => <HomeScreen {...props} openSearch={opemSearch}/>}

        </Stack.Screen>
        <Stack.Screen name='ImageScreen' component={ImageScreen} 
        options={{
          title: "Pexels App",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "#000"
          },
        }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 37,
    height: 37,
    marginEnd:5,
    borderRadius: 5
  }
})