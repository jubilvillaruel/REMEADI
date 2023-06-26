import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from './src/screens/LandingPage';
// import SignIn from './src/screens/SignIn';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Verification from './src/screens/Verification';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          },
          headerTintColor: '#2EC4B6',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          }
      }}>
        <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In'}}/>
        <Stack.Screen name="Sign_Up" component={SignUp} options={{title: 'Sign Up'}}/>
        <Stack.Screen name="Verification" component={Verification} options={{title: 'Verification'}}/>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
