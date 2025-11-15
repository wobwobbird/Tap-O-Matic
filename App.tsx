import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/components/screens/HomeScreen';
import KasiaScreen from 'src/components/screens/KasiaScreen';
import Ran1 from 'src/components/screens/Ran1';
import Ran2 from 'src/components/screens/Ran2';
import Ran3 from 'src/components/screens/Ran3';
import Ran4 from 'src/components/screens/Ran4';
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
                <Ionicons name="home-outline" size={24} color="#007AFF" />
              )
            }}
            />
          <Tab.Screen 
            name="Ran1"
            component={Ran1}
            options={{ 
              tabBarLabel: '1-9',
              tabBarIcon: () => (
                <Ionicons name="aperture-outline" size={24} color="#007AFF" />
              )
            }}
          />
          <Tab.Screen 
            name="Coin"
            component={Ran2}
            options={{ 
              tabBarLabel: 'Coin',
              tabBarIcon: () => (
                <Ionicons name="logo-bitcoin" size={24} color="#007AFF" />
              )
            }}
          />
          <Tab.Screen 
            name="Ran3"
            component={Ran3}
            options={{ 
              tabBarLabel: 'Ran3',
              tabBarIcon: () => (
                <Ionicons name="barbell-outline" size={24} color="#007AFF" />
              )
            }}
          />
          <Tab.Screen 
            name="Ran4"
            component={Ran4}
            options={{ 
              tabBarLabel: 'Ran4',
              tabBarIcon: () => (
                <Ionicons name="cash-outline" size={24} color="#007AFF" />
              )
            }}
          />
          <Tab.Screen
            name="Kasia"
            component={KasiaScreen}
            options={{ 
              tabBarLabel: 'Kasias',
              tabBarIcon: () => (
                <Ionicons name="people-circle-outline" size={24} color="#007AFF" />
              )
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </StateProvider>
  );
}