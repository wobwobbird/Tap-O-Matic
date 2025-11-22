import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/components/screens/HomeScreen';
import KasiasScreen from 'src/components/screens/KasiasScreen';
import BattleFor100 from 'src/components/screens/BattleFor100';
import CoinFlip from 'src/components/screens/CoinFlip';
import ClosestTo21 from 'src/components/screens/ClosestTo21';
import TheSelector from 'src/components/screens/TheSelector';
import { Ionicons } from '@expo/vector-icons';
import StateProvider from 'src/context/StateContext';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <StateProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ 
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <Ionicons name="home" size={24} color="#007AFF" />
              )
            }}
            />
            <Tab.Screen 
              name="The Selector"
              component={TheSelector}
              options={{ 
                tabBarLabel: 'Selector',
                tabBarIcon: () => (
                  <Ionicons name="aperture" size={24} color="#007AFF" />
                )
              }}
            />
          <Tab.Screen 
            name="Battle For 100"
            component={BattleFor100}
            options={{ 
              tabBarLabel: 'Battle 100',
              tabBarIcon: () => (
                <Ionicons name="options-outline" size={24} color="#007AFF" /> //aperture-outline
              )
            }}
          />
          <Tab.Screen 
            name="Closest To 21"
            component={ClosestTo21}
            options={{ 
              tabBarLabel: '21',
              tabBarIcon: () => (
                <Ionicons name="push" size={24} color="#007AFF" />
              )
            }}
          />
          <Tab.Screen 
            name="Coin Flip"
            component={CoinFlip}
            options={{ 
              tabBarLabel: 'Coin Flip',
              tabBarIcon: () => (
                <Ionicons name="logo-bitcoin" size={24} color="#007AFF" />
              )
            }}
          />
          <Tab.Screen
            name="The Three Kasias"
            component={KasiasScreen}
            options={{ 
              tabBarLabel: 'Kasias',
              tabBarIcon: () => (
                <Ionicons name="people-circle" size={24} color="#007AFF" />
              )
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </StateProvider>
  );
}