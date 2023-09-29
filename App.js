import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { screenHeight } from './src/components/Dimensions';
import { RFPercentage } from "react-native-responsive-fontsize";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Images
import appLogo from './assets/images/app_logo.png';
import statisticsLogo from './assets/images/navigation/statistics.png';
import statisticsActive from './assets/images/navigation/statisticsActive.png';
import milestonesLogo from './assets/images/navigation/milestones.png';
import milestonesActive from './assets/images/navigation/milestonesActive.png';
import accountLogo from './assets/images/navigation/account.png';
import accountActive from './assets/images/navigation/accountActive.png';

// Starting Screens
import Landing from './src/screens/LandingPage';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';

// Tab Navigation
import Home from './src/screens/Home';
import Statistics from './src/screens/Statistics';
import Milestones from './src/screens/Milestones';
import Account from './src/screens/Account';

// Other Screens
import EditAccount from './src/screens/EditAccount';
import MedLibrary from './src/screens/MedLibrary';
import SelectReligion from './src/screens/SelectReligion';
import SelectRelBranch from './src/screens/SelectRelBranch';
import SelectMedType from './src/screens/SelectMedType';
import Questions from './src/screens/Questions';
import ExpertResult from './src/screens/ExpertResult';
import ExpertReligion from './src/screens/ExpertReligion';
import ExpertType from './src/screens/ExpertType';
import Guide from './src/screens/Guide';
import Session from './src/screens/Session';
import Splash from './src/screens/Splash';
import { auth } from './firebase';
import ManageQuote from './src/screens/ManageQuote';
import ForgotPassword from './src/screens/ForgotPassword';
import ConcludeSession from './src/screens/ConcludeSession';
import Notify from './src/screens/Notify';

// Google Sign in
// import {
  // GoogleSignin,
// } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '282078135356-unkclsh6fudgjo3cci3acfb3g2d4hska.apps.googleusercontent.com',
// });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarLabel({ label, focused }) {
  return (
    <Text style={{
      fontWeight: focused ? 'bold' : 'normal',
      fontSize: RFPercentage(1.5),
      position: 'absolute',
      color: focused ? '#FFBF69' : '#757575' }}>
      {label}
    </Text>
  );
}

function HomeScreen ( {route} ) {
  const { setUserToken } = route.params;

  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: screenHeight('10%'),
        justifyContent: 'center',
        paddingBottom: 15,
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
      tabBarLabelStyle: {
        position: 'absolute'
      }
    }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          title: ({ focused }) => <TabBarLabel label="Home" focused={focused} />,
          tabBarIcon: () => (
            <Image source={appLogo} style={{ width: 45, height: 45, resizeMode: 'contain' }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Statistics'
        component={Statistics}
        options={{
          title: ({ focused }) => <TabBarLabel label="Statistics" focused={focused} />,
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? statisticsActive : statisticsLogo} style={{ width: 28, height: 28 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Milestones'
        component={Milestones}
        options={{
          title: ({ focused }) => <TabBarLabel label="Milestones" focused={focused} />,
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? milestonesActive : milestonesLogo} style={{ width: 20, height: 28 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Account'
        component={Account}
        initialParams={{setUserToken}}
        options={{
          title: ({ focused }) => <TabBarLabel label="Account" focused={focused} />,
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? accountActive : accountLogo} style={{ width: 26, height: 24 }}/>
          ),
        }}>
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const getUserToken = async () => {
    try {
      let counter = 0;
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      while (counter < 30) {
        await sleep(100);
        if (auth.currentUser !== null) {
          console.log('user is found!')
          setUserToken(auth.currentUser.uid);
          break;
        } else {
          console.log('no user!')
          counter++;
          continue
        }
      }
      console.log('total waiting second/s :',counter/10)
    }finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Splash />;
  }
  
  return (
    
    <NavigationContainer>
        {userToken == null ? (
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
              fontSize: RFPercentage(2.5),
            }
        }}>
            <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
            <Stack.Screen name="SignIn" component={SignIn} initialParams={ {setUserToken} } options={{title: 'Sign In'}}/>
            <Stack.Screen name="SignUp" component={SignUp} initialParams={ {setUserToken} } options={{title: 'Sign Up'}}/>
            <Stack.Screen name="ManageQuote" component={ManageQuote} options={{title: 'ADMIN - Manage Quote'}}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: 'Forgot Password'}}/>
        </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
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
              fontSize: RFPercentage(2.5),
            }
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} initialParams={ {setUserToken} } options={{headerShown: false}}/>
            
            {/* Other Screens */}
            <Stack.Screen name='EditAccount' component={EditAccount} options={{title: 'Edit Account Details'}}/>
            <Stack.Screen name='MedLibrary' component={MedLibrary} options={{title: 'Library'}}/>
            <Stack.Screen name='SelectReligion' component={SelectReligion} options={{title: 'Meditation'}}/>
            <Stack.Screen name='SelectRelBranch' component={SelectRelBranch} options={{title: 'Meditation'}}/>
            <Stack.Screen name='SelectMedType' component={SelectMedType} options={{title: 'Meditation'}}/>
            <Stack.Screen name='Questions' component={Questions} options={{title: 'Meditation'}}/>
            <Stack.Screen name='ExpertResult' component={ExpertResult} options={{title: 'Recommended'}}/>
            <Stack.Screen name='ExpertReligion' component={ExpertReligion} options={{title: 'More Practices'}}/>
            <Stack.Screen name='ExpertType' component={ExpertType} options={{title: 'More Practices'}}/>
            <Stack.Screen name='Guide' component={Guide} options={{headerTransparent: true, title: '',}}/>
            <Stack.Screen name="Session" component={Session} options={{headerShown: false}}/>
            <Stack.Screen name="ConcludeSession" component={ConcludeSession} options={{headerShown: false}}/>
            <Stack.Screen name="ManageQuote" component={ManageQuote} options={{headerShown: false}}/>
            <Stack.Screen name="Notify" component={Notify} options={{headerShown: false}}/>
        </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}