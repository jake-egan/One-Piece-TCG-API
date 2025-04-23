import * as React from 'react';
import { Button, View } from 'react-native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Discovered from './app/screens/Discovered';
import Settings from './app/screens/Settings';
import Icon from 'react-native-vector-icons/Ionicons'; 
import {useTranslation} from 'react-i18next';


const MyTabs = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  const { t } = useTranslation();
  return (
    <MyTabs.Navigator>
      {authState?.authenticated ? (
        <>
          <MyTabs.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: t('tabs.home'),
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={size} color={color} /> 
              ),
            }}
          />
          <MyTabs.Screen
            name="Discovered"
            component={Discovered}
            options={{
              headerShown: false,
              tabBarLabel: t('tabs.discovered'),
              tabBarIcon: ({ color, size }) => (
                <Icon name="documents" size={size} color={color} /> 
              ),
            }}
          />
          <MyTabs.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
              tabBarLabel: t('tabs.settings'),
              tabBarIcon: ({ color, size }) => (
                <Icon name="settings" size={size} color={color} /> 
              ),
            }}
          />
        </>
      ) : (
        <MyTabs.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            tabBarLabel: t('tabs.login'),
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ color, size }) => (
              <Icon name="log-in" size={size} color={color} />
            ),
          }}
        />
      )}
    </MyTabs.Navigator>
  );
};
