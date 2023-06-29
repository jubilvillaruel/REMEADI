import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Images
import appLogo from './assets/images/app_logo.png';
import statisticsLogo from './assets/images/navigation/statistics.png';
import milestonesLogo from './assets/images/navigation/milestones.png';
import accountLogo from './assets/images/navigation/account.png';

// Starting Screens
import Landing from './src/screens/LandingPage';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Verification from './src/screens/Verification';

// Tab Navigation
import Home from './src/screens/Home';
import Statistics from './src/screens/Statistics';
import Milestones from './src/screens/Milestones';
import Account from './src/screens/Account';

// Other Screens
import MedLibrary from './src/screens/MedLibrary';
import Guide from './src/screens/Guide';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen () {
  // const { user } = route.params;
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      tabBarActiveTintColor: '#FFBF69',
      tabBarLabelPosition: 'below-icon',
    }}>
      <Tab.Screen
        name='Home'
        component={Home}
        // initialParams={{ user: "it worked!" }}
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Image source={appLogo} style={{ width: '130%', height: 24 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Statistics'
        component={Statistics}
        options={{
          title: 'Statistics',
          tabBarIcon: () => (
            <Image source={statisticsLogo} style={{ width: 24, height: 24 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Milestones'
        component={Milestones}
        options={{
          title: 'Milestones',
          tabBarIcon: () => (
            <Image source={milestonesLogo} style={{ width: 24, height: 24 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          title: 'Account',
          tabBarIcon: () => (
            <Image source={accountLogo} style={{ width: 24, height: 24 }}/>
          ),
        }}>
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            shadowColor: '#000000',
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

        {/* Starting Screens */}
        <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In'}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{title: 'Sign Up'}}/>
        <Stack.Screen name="Verification" component={Verification} options={{title: 'Verification'}}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}}/>
        
        {/* Other Screens */}
        <Stack.Screen name='MedLibrary' component={MedLibrary} options={{title: 'Meditation Library'}}/>
        <Stack.Screen name='Guide' component={Guide} options={{title: 'Guide'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
