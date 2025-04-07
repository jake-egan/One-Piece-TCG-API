import * as React from 'react';
import { Button, View } from 'react-native';

import { AuthProvider, useAuth } from './app/context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Discovered from './app/screens/Discovered';

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

  return (
    <MyTabs.Navigator>
      {authState?.authenticated ? (
        <>
          <MyTabs.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
            }}
          />
          <MyTabs.Screen
            name="Discovered"
            component={Discovered}
            options={{
              headerShown: false,
              tabBarLabel: 'Discovered',
            }}
          />
          <MyTabs.Screen
            name="Logout"
            component={() => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={onLogout} title="Sign Out" />
              </View>
            )}
            options={{
              headerShown: false,
              tabBarButton: () => (
                <Button title="Logout" onPress={onLogout} />
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
            tabBarLabel: 'Login',
            tabBarStyle: { display: 'none' }
          }}
        />
      )}
    </MyTabs.Navigator>
  );
};
