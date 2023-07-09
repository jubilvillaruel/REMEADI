import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { screenHeight } from './src/components/dimensions';
import { RFPercentage } from "react-native-responsive-fontsize";
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

// Tab Navigation
import Home from './src/screens/Home';
import Statistics from './src/screens/Statistics';
import Milestones from './src/screens/Milestones';
import Account from './src/screens/Account';

// Other Screens
import EditAccount from './src/screens/EditAccount';
import MedLibrary from './src/screens/MedLibrary';
import ExpertResult from './src/screens/ExpertResult';
import Guide from './src/screens/Guide';
import GuideOptions from './src/screens/GuideOptions';
import Session from './src/screens/Session';
import Splash from './src/screens/Splash';
import { auth } from './firebase';
import ManageQuote from './src/screens/ManageQuote';

// Google Sign in
// import {
  // GoogleSignin,
// } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '282078135356-unkclsh6fudgjo3cci3acfb3g2d4hska.apps.googleusercontent.com',
// });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen ( {route} ) {
  const { setUserToken } = route.params;

  return (
    <Tab.Navigator initialRouteName='Home' initialParams={ {setUserToken} } screenOptions={{
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
        fontWeight: 'bold',
        position: 'absolute'
      }
    }}>
      <Tab.Screen
        name='Home'
        component={Home}
        initialParams={{ setUserToken }}
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Image source={appLogo} style={{ width: '145%', height: 28 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Statistics'
        component={Statistics}
        options={{
          title: 'Statistics',
          tabBarIcon: () => (
            <Image source={statisticsLogo} style={{ width: 28, height: 28 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Milestones'
        component={Milestones}
        options={{
          title: 'Milestones',
          tabBarIcon: () => (
            <Image source={milestonesLogo} style={{ width: 28, height: 28 }}/>
          ),
        }}>
      </Tab.Screen>

      <Tab.Screen
        name='Account'
        component={Account}
        initialParams={ {setUserToken} }
        options={{
          title: 'Account',
          tabBarIcon: () => (
            <Image source={accountLogo} style={{ width: 28, height: 28 }}/>
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
    // testing purposes
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      // custom logic
      // await for the user existence verification
      await sleep(2000);
      await auth.currentUser !== null ? setUserToken(auth.currentUser.uid)  : setUserToken(null)
    } finally {
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
            <Stack.Screen name='MedLibrary' component={MedLibrary} options={{title: 'Meditation Library'}}/>
            <Stack.Screen name='ExpertResult' component={ExpertResult} options={{title: 'Recommended'}}/>
            <Stack.Screen name='Guide' component={Guide} options={{headerTransparent: true, title: '',}}/>
            <Stack.Screen name='GuideOptions' component={GuideOptions} options={{title: 'Guide Options'}}/>
            <Stack.Screen name="Session" component={Session} options={{headerShown: false}}/>
        </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}
