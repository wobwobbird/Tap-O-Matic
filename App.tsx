import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/components/screens/HomeScreen';
import KasiaScreen from 'src/components/screens/KasiaScreen';
import Ran1 from 'src/components/screens/Ran1';
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
              tabBarLabel: 'Ran1',
              tabBarIcon: () => (
                <Ionicons name="aperture-outline" size={24} color="#007AFF" />
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